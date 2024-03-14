import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useTimes } from "./useTimes";

export default () => {
  const { data: times, primary, add, remove, markPrimary } = useTimes();

  return <List>
    <List.Section title="Primary">
      <List.Item
        key={primary.code}
        title={`${primary.code} <-> ${primary.value}`}
      />
    </List.Section>
    <List.Section title="Others">
      {times.map(t =>
        <List.Item
          key={t.code}
          title={`${t.code} <-> ${t.value}`}
          actions={
            <ActionPanel title="Management">
              <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => markPrimary(t.code)} />
              <Action icon={Icon.Plus} title="Add" onAction={() => add()} />
              <Action icon={Icon.Trash} title="Remove" onAction={() => remove(t.code)} />
            </ActionPanel>
          }
        />)}
    </List.Section>
  </List>;
};
