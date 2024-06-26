export const jsToSqlStringArrayConverter = (array: Array<string>) => {
	return array.map((type: string) => `'${type}'`).join(',');
};
