import { Client, QueryResult } from 'pg';
import { client } from '../utils';

export class ValidateModel {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}
	public checkGen1IfExists = async (pokemonName: string): Promise<boolean> => {
		const tableName = 'all_pokemons_gen_1';
		const result: QueryResult<any> = await this.client.query(`
      SELECT exists (SELECT 1 FROM ${tableName} apg WHERE name = '${pokemonName}' LIMIT 1);
      `);

		const hasPokemon = result.rows[0].exists;

		return hasPokemon;
	};
}

export default new ValidateModel(client);
