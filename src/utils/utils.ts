export const partition = <T>(array: Array<T>, predicate: (val: T) => boolean): [Array<T>, Array<T>] => {
  const partitioned: [Array<T>, Array<T>] = [[], []];
  array.forEach((val: T) => {
    const partitionIndex: 0 | 1 = predicate(val) ? 0 : 1;
    partitioned[partitionIndex].push(val);
  });
  return partitioned;
};

export const getNowTime = (timeZone: string) => new Date()
  .toLocaleString(undefined, { timeStyle: "short", timeZone, hour12: false });

export const caseInsensitiveContains = (string: string, searchString: string) => string.toLowerCase().includes(searchString.toLowerCase());

export const PRIMARY_CODE = "PrimaryCode";

export const getCurrentTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getLocationFromTimeZone = (timeZone: string, defaultValue: string = "") => timeZone
  .split("/")
  .at(-1)
  ?.replace("_", " ") ?? defaultValue;
