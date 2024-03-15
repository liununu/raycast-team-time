import { MenuBarExtra } from "@raycast/api";
import { useTimes } from "./hooks/useTimes";
import { noop, partition } from "./utils/utils";

export default () => {
  const { data, primaryCode } = useTimes();
  const [primary, others] = partition(data, (t) => t.code == primaryCode);

  const format = ({ code, value }: { code: string; label: string; value: string }) => `${value} ${code}`;

  const buildTimeSection = (type: "Primary" | "Others", times: { code: string; label: string; value: string }[]) =>
    <MenuBarExtra.Section title={type}>
      {times.map((t, index) => (
        <MenuBarExtra.Item key={index} title={format(t)} onAction={noop} />
      ))}
    </MenuBarExtra.Section>;

  return (
    <MenuBarExtra icon="../assets/icon.png" tooltip="Team Time" title={format(primary[0])}>
      {buildTimeSection("Primary", primary)}
      {buildTimeSection("Others", others)}
    </MenuBarExtra>
  );
}
