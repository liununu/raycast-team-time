import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useTimes } from "./hooks/useTimes";
import { partition } from "./utils/utils";
import AddForm from "./components/AddForm";
import { Time } from "./types/types";

export default () => {
  const { push, pop } = useNavigation();
  const { data, primaryCode, add, remove, removeAll, markPrimary, setSearchText } = useTimes();
  const [primary, others] = partition(data, (t) => t.code == primaryCode);

  const buildTimeSection = (type: "Primary" | "Others", times: Time[]) =>
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

  return <List filtering={false} onSearchTextChange={setSearchText} searchBarPlaceholder="Search Times...">
    {data.length == 0 ?
      <List.EmptyView icon={Icon.Emoji} title="Press ↵ to Start" actions={
        <ActionPanel>
          <Action icon={Icon.Plus} title="Start"
                  onAction={() => push(<AddForm onSubmit={({ code, label }) => add(code, label).then(pop)} />)} />
        </ActionPanel>} /> :
      <>
        {buildTimeSection("Primary", primary)}
        {buildTimeSection("Others", others)}
      </>
    }
  </List>;
};
