import { LocalStorage, updateCommandMetadata } from "@raycast/api";
import { getCurrentTimeZone, getNowTime, PRIMARY_CODE } from "./utils/utils";

export default async () => {
  const primary = await LocalStorage.getItem(PRIMARY_CODE);
  const timeZone = primary ?? getCurrentTimeZone();
  const nowTime = getNowTime(String(timeZone));
  await updateCommandMetadata({ subtitle: `${timeZone} ${nowTime}` });
};
