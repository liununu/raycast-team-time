import { Action, ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";

export default () => {
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
      .catch(() => setTimes([]));
  }, []);

  const items = times
    .sort((a, b) => a.code.localeCompare(b.code))
    .map(t => <List.Item
      key={t.code}
      title={`${t.code} <-> ${t.value}`}
      actions={
        <ActionPanel title="Management">
          <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => console.log("primary")} />
          <Action icon={Icon.Plus} title="Add" onAction={() => LocalStorage.setItem("Australia/Sydney", "Label")} />
          <Action icon={Icon.Trash} title="Remove" onAction={() => console.log("remove")} />
        </ActionPanel>
      }
    />);

  return (
    <List navigationTitle="navigationTitle">
      {items}
    </List>
  );
};
