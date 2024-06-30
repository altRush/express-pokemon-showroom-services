import { Client } from 'pg';

interface IStoreModelUtils {
	jsArrayToSqlStringifiedArrayConverter(stringArray: string[]): string;
	client: Client;
}

interface IStorePokemonResponse {
	success: boolean;
	message?: string;
}

export { IStoreModelUtils, IStorePokemonResponse };
