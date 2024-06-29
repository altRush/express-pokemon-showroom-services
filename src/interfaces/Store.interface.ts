import { Client } from 'pg';
import { StoreModel } from '../models/store.model';

interface StoreModelUtils {
	jsArrayToSqlStringifiedArrayConverter(stringArray: string[]): string;
	client: Client;
}

export { StoreModel as IStoreModel, StoreModelUtils };
