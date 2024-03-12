import MenuBar from "./menu-bar";

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

  return <MenuBar times={[time]} action={setting} />;
};
