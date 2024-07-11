import { JsArrayToSqlArrayConverter } from '../interfaces/store.interface';

export const jsArrayToSqlArrayConverter: JsArrayToSqlArrayConverter = (
  array,
): string => {
  return array
    .map((item) => {
      if (typeof item === 'number') {
        return `${item}`;
      }
      if (typeof item === 'string') {
        return `'${item}'`;
      }
    })
    .join(',');
};
