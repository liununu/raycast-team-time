import { Action, ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { useTimes } from "./useTimes";

export default () => {
  const { data: times, remove } = useTimes();

  return <List navigationTitle="navigationTitle">
    {times.map(t => <List.Item
      key={t.code}
      title={`${t.code} <-> ${t.value}`}
      actions={
        <ActionPanel title="Management">
          <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => console.log("primary")} />
          <Action icon={Icon.Plus} title="Add" onAction={() => LocalStorage.setItem("Australia/Sydney", "Label")} />
          <Action icon={Icon.Trash} title="Remove" onAction={() => remove(t.code)} />
        </ActionPanel>
      }
    />)}
  </List>;
};
