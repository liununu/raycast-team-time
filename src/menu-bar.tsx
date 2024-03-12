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

export default () => {
  const nowTime = new Date().toLocaleString(undefined, { timeStyle: "short" });
  const time = {
    emoji: "🇨🇳",
    code: "CN",
    label: "China",
    value: nowTime
  };
  const setting = {
    name: "Setting", do: () => {
      console.log("should open setting page");
    }
  };
  const items = [time].map(t => <MenuBarExtra.Item key={t.code} title={`${t.emoji} ${t.label}: ${t.value}`} />);

  return (
    <MenuBarExtra icon="../assets/icon.png" tooltip="Team Time">
      {items}
      {setting ? <MenuBarExtra.Item title={setting.name} onAction={setting.do} /> : null}
    </MenuBarExtra>
  );
}
