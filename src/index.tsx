import { LocalStorage, updateCommandMetadata } from "@raycast/api";
import { getCurrentTimeZone, getNowTime, PRIMARY_CODE } from "./utils/utils";

export default async () => {
  const primary = await LocalStorage.getItem(PRIMARY_CODE);
  const timezone = primary ?? getCurrentTimeZone();
  const nowTime = getNowTime(String(timezone));
  await updateCommandMetadata({ subtitle: `${timezone} ${nowTime}` });
};
