import { useEffect, useState } from "react";
import { LocalStorage } from "@raycast/api";

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

  useEffect(() => {
    LocalStorage.allItems()
      .then((items) => {
        const allTimes = Object.entries(items)
          .reduce((pre, cur) => pre.concat({ code: cur[0], value: cur[1] }), initTimes);
        setTimes(allTimes);
      })
      .catch(() => setTimes(initTimes));
  }, [refresh]);

  const data = times
    .sort((a, b) => a.code.localeCompare(b.code));

  const remove = async (itemKey: string) => {
    await LocalStorage.removeItem(itemKey);
    setRefresh(!refresh);
  };

  return {
    data,
    remove
  };
};
