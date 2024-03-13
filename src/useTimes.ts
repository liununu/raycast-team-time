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

  const [times, setTimes] = useState<Time[]>([defaultTime]);

  useEffect(() => {
    LocalStorage.allItems()
      .then((items) => {
        const reduce = Object.entries(items).reduce((pre, cur) => pre.concat({ code: cur[0], value: cur[1] }), times);
        setTimes(reduce);
      })
      .catch(() => setTimes([defaultTime]));
  }, []);

  return times.sort((a, b) => a.code.localeCompare(b.code));
};
