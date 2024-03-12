import { MenuBarExtra } from "@raycast/api";

interface IMenuBarProps {
  times: {
    emoji: string
    code: string
    label: string
    value: string
  }[];
  action?: {
    name: string
    do: () => void
  };
}

export default ({ times = [], action }: IMenuBarProps) => {
  const items = times.map(t => <MenuBarExtra.Item key={t.code} title={`${t.emoji} ${t.label}: ${t.value}`} />);

  return (
    <MenuBarExtra icon="../assets/icon.png" tooltip="Team Time">
      {items}
      {action ? <MenuBarExtra.Item title={action.name} onAction={action.do} /> : null}
    </MenuBarExtra>
  );
}
