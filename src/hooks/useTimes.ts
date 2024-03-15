import { useEffect, useState } from "react";
import { Alert, confirmAlert, LocalStorage } from "@raycast/api";
import { caseInsensitiveContains, getNowTime, PRIMARY_CODE } from "../utils/utils";
import { Time } from "../types/types";

export const useTimes = () => {
  const [refresh, setRefresh] = useState(false);
  const [times, setTimes] = useState<Time[]>([]);
  const [primaryCode, setPrimaryCode] = useState<string>();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    LocalStorage.allItems()
      .then((items) => {
        const times = Object.entries(items)
          .filter(item => item[0] != PRIMARY_CODE)
          .reduce((pre, cur) => pre.concat({ code: cur[0], value: getNowTime(cur[0]), label: cur[1] }), <Time[]>[])
          .filter(t => caseInsensitiveContains(t.code, searchText) || caseInsensitiveContains(t.label, searchText));
        setTimes(times);
      })
      .catch(() => setTimes([]));
  }, [refresh, searchText]);

  useEffect(() => {
    LocalStorage.getItem(PRIMARY_CODE)
      .then(code => setPrimaryCode(code as (string | undefined)))
      .catch(() => setPrimaryCode(undefined));
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
