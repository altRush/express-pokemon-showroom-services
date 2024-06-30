import { Client } from 'pg';

interface StoreModelUtils {
	jsArrayToSqlStringifiedArrayConverter(stringArray: string[]): string;
	client: Client;
}

export { StoreModelUtils };
