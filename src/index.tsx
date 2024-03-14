import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useTimes } from "./useTimes";

export default () => {
  const { data: times, add, remove } = useTimes();

  return <List navigationTitle="navigationTitle">
    {times.map(t => <List.Item
      key={t.code}
      title={`${t.code} <-> ${t.value}`}
      actions={
        <ActionPanel title="Management">
          <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => console.log("primary")} />
          <Action icon={Icon.Plus} title="Add" onAction={() => add()} />
          <Action icon={Icon.Trash} title="Remove" onAction={() => remove(t.code)} />
        </ActionPanel>
      }
    />)}
  </List>;
};
