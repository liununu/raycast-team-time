import { useEffect, useState } from "react";
import { Alert, confirmAlert, LocalStorage } from "@raycast/api";
import { caseInsensitiveContains, getCurrentTimeZone, getNowTime, PRIMARY_CODE } from "../utils/utils";

export const useTimes = () => {
  const currentTimeZone = getCurrentTimeZone();
  const defaultTime = {
    code: currentTimeZone,
    label: "Current",
    value: getNowTime(currentTimeZone)
  };
  const initTimes = [defaultTime];

  const [refresh, setRefresh] = useState(false);
  const [times, setTimes] = useState(initTimes);
  const [primaryCode, setPrimaryCode] = useState(currentTimeZone);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    LocalStorage.allItems()
      .then((items) => {
        const times = Object.entries(items)
          .filter(item => item[0] != PRIMARY_CODE)
          .reduce((pre, cur) => pre.concat({ code: cur[0], value: getNowTime(cur[0]), label: cur[1] }), initTimes)
          .filter(t => caseInsensitiveContains(t.code, searchText) || caseInsensitiveContains(t.label, searchText));
        setTimes(times);
      })
      .catch(() => setTimes(initTimes));
  }, [refresh, searchText]);

  useEffect(() => {
    LocalStorage.getItem(PRIMARY_CODE)
      .then(code => {
        setPrimaryCode(String(code ?? currentTimeZone));
      })
      .catch(() => setPrimaryCode(currentTimeZone));
  }, [refresh]);

  const data = times
    .sort((a, b) => a.code.localeCompare(b.code));

  const add = async (code: string, label: string) => {
    await LocalStorage.setItem(code, label);
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
    primaryCode,
    add,
    remove,
    removeAll,
    markPrimary,
    setSearchText
  };
};
