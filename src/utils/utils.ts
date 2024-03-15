export const partition = <T>(array: Array<T>, predicate: (val: T) => boolean): [Array<T>, Array<T>] => {
  const partitioned: [Array<T>, Array<T>] = [[], []];
  array.forEach((val: T) => {
    const partitionIndex: 0 | 1 = predicate(val) ? 0 : 1;
    partitioned[partitionIndex].push(val);
  });
  return partitioned;
};
