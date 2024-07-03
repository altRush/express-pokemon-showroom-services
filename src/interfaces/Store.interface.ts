import { Pool } from 'pg';

interface IStoreModelUtils {
  jsArrayToSqlStringifiedArrayConverter(stringArray: string[]): string;
  dbPool: Pool;
}

interface IStorePokemonResponse {
  success: boolean;
  message?: string;
}

export { IStoreModelUtils, IStorePokemonResponse };
