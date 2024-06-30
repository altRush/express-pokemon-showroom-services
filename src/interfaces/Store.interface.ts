import { Client } from 'pg';

interface IStoreModelUtils {
	jsArrayToSqlStringifiedArrayConverter(stringArray: string[]): string;
	client: Client;
}

export { IStoreModelUtils };
