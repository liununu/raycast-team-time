import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useTimes } from "./useTimes";
import { partition } from "./utils";

const ACTION_PANEL_TITLE = "Management";

export default () => {
  const { data, primaryCode, add, remove, removeAll, markPrimary } = useTimes();
  const addAction = <Action icon={Icon.Plus} title="Add" onAction={() => add()} />;
  const removeAllAction = <Action icon={Icon.RotateClockwise} title="Remove All" onAction={removeAll}
                                  style={Action.Style.Destructive} />;
  const [[primary], others] = partition(data, (t) => t.code == primaryCode);

  return <List>
    <List.Section title="Primary">
      <List.Item
        key={primary.code}
        title={primary.label}
        subtitle={primary.value}
        accessories={[{ text: primary.code }]}
        actions={
          <ActionPanel title={ACTION_PANEL_TITLE}>
            {addAction}
            {removeAllAction}
          </ActionPanel>
        }
      />
    </List.Section>
    <List.Section title="Others">
      {others.map(t =>
        <List.Item
          key={t.code}
          title={t.label}
          subtitle={t.value}
          accessories={[{ text: t.code }]}
          actions={
            <ActionPanel title={ACTION_PANEL_TITLE}>
              <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => markPrimary(t.code)} />
              {addAction}
              <Action icon={Icon.Trash} title="Remove" onAction={() => remove(t.code)} />
              {removeAllAction}
            </ActionPanel>
          }
        />)}
    </List.Section>
  </List>;
};
