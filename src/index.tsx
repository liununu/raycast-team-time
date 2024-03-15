import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useTimes } from "./hooks/useTimes";
import { partition } from "./utils/utils";
import AddForm from "./components/AddForm";

export default () => {
  const { push, pop } = useNavigation();
  const { data, primaryCode, add, remove, removeAll, markPrimary } = useTimes();
  const [primary, others] = partition(data, (t) => t.code == primaryCode);

  const buildTimeSection = (type: "Primary" | "Others", times: { code: string; label: string; value: string }[]) =>
    <List.Section title={type}>
      {times.map((t, index) =>
        <List.Item
          key={index}
          title={t.label}
          subtitle={t.value}
          accessories={[{ text: t.code }]}
          actions={<ActionPanel title={"Management"}>
            <Action icon={Icon.Heart} title="Mark as Primary" onAction={() => markPrimary(t.code)} />
            <Action icon={Icon.Plus} title="Add"
                    onAction={() => push(<AddForm onSubmit={({ code, label }) => add(code, label).then(pop)} />)} />
            <Action icon={Icon.Trash} title="Remove" onAction={() => remove(t.code)} />
            <Action icon={Icon.RotateClockwise} title="Remove All" onAction={removeAll}
                    style={Action.Style.Destructive} />
          </ActionPanel>}
        />)}
    </List.Section>;

  return <List>
    {buildTimeSection("Primary", primary)}
    {buildTimeSection("Others", others)}
  </List>;
};
