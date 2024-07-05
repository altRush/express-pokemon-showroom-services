export const jsArrayToSqlStringifiedArrayConverter = (
  array: Array<string>,
): string => {
  return array.map((type: string) => `'${type}'`).join(',');
};
