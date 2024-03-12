import { Action, ActionPanel, Icon, List } from "@raycast/api";

export default () => {
  const nowTime = new Date().toLocaleString(undefined, { timeStyle: "short" });
  const time = {
    emoji: "🇨🇳",
    code: "CN",
    label: "China",
    value: nowTime
  };
  const items = [time].map(t => <List.Item
    key={t.code}
    title={`${t.emoji} ${t.label}: ${t.value}`}
    actions={
      <ActionPanel title="Management">
        <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => console.log("primary")} />
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
