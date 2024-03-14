import { useEffect, useState } from "react";
import { LocalStorage } from "@raycast/api";

const primaryCode = "PrimaryCode";

export const useTimes = () => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const nowTime = new Date().toLocaleString(undefined, {
    timeStyle: "short",
    timeZone: currentTimeZone,
    hour12: false
  });
  const defaultTime = {
    code: currentTimeZone,
    value: nowTime
  };
  const initTimes = [defaultTime];

  const [refresh, setRefresh] = useState(false);
  const [times, setTimes] = useState(initTimes);
  const [primary, setPrimary] = useState(defaultTime);

  useEffect(() => {
    LocalStorage.allItems()
      .then((items) => {
        const allTimes = Object.entries(items)
          .reduce((pre, cur) => pre.concat({ code: cur[0], value: cur[1] }), initTimes);
        setTimes(allTimes);
      })
      .catch(() => setTimes(initTimes));
  }, [refresh]);

  useEffect(() => {
    LocalStorage.getItem(primaryCode)
      .then(code => {
        const time = code == undefined ? code : times.find(t => t.code == code);
        setPrimary(time == undefined ? defaultTime : time);
      })
      .catch(() => setPrimary(defaultTime));
  }, [refresh]);

  const data = times
    .sort((a, b) => a.code.localeCompare(b.code));

  const add = async () => {
    await LocalStorage.setItem(new Date().toUTCString(), "fake data");
    setRefresh(!refresh);
  };

  const remove = async (code: string) => {
    await LocalStorage.removeItem(code);
    setRefresh(!refresh);
  };

  const markPrimary = async (code: string) => {
    await LocalStorage.setItem(primaryCode, code);
    setRefresh(!refresh);
  };

  return {
    data,
    primary,
    add,
    remove,
    markPrimary
  };
};
