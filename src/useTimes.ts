import { useEffect, useState } from "react";
import { Alert, confirmAlert, LocalStorage } from "@raycast/api";

const PRIMARY_CODE = "PrimaryCode";

const getNowTime = (timezone: string) => new Date()
  .toLocaleString(undefined, { timeStyle: "short", timeZone: timezone, hour12: false });

export const useTimes = () => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultTime = {
    code: currentTimeZone,
    label: "Current",
    value: getNowTime(currentTimeZone)
  };
  const initTimes = [defaultTime];

  const [refresh, setRefresh] = useState(false);
  const [times, setTimes] = useState(initTimes);
  const [primary, setPrimary] = useState(defaultTime);

  useEffect(() => {
    LocalStorage.allItems()
      .then((items) => {
        const allTimes = Object.entries(items)
          .reduce((pre, cur) => pre.concat({ code: cur[0], value: getNowTime(cur[0]), label: cur[1] }), initTimes);

        LocalStorage.getItem(PRIMARY_CODE)
          .then(code => {
            const time = allTimes.find(t => t.code == code) ?? defaultTime;
            setPrimary(time);
          })
          .catch(() => setPrimary(defaultTime));

        setTimes(allTimes);
      })
      .catch(() => setTimes(initTimes));
  }, [refresh]);

  const data = times
    .sort((a, b) => a.code.localeCompare(b.code));

  const add = async () => {
    await LocalStorage.setItem("Australia/Sydney", "澳洲 🦘");
    setRefresh(!refresh);
  };

  const remove = async (code: string) => {
    await LocalStorage.removeItem(code);
    setRefresh(!refresh);
  };

  const removeAll = async () => {
    const options: Alert.Options = {
      title: "Remove All",
      message: "Would you like to remove all the times?",
      primaryAction: {
        title: "Yes",
        style: Alert.ActionStyle.Destructive,
        onAction: () => LocalStorage.clear().then(() => setRefresh(!refresh))
      }
    };
    await confirmAlert(options);
  };

  const markPrimary = async (code: string) => {
    await LocalStorage.setItem(PRIMARY_CODE, code);
    setRefresh(!refresh);
  };

  return {
    data,
    primary,
    add,
    remove,
    removeAll,
    markPrimary
  };
};
