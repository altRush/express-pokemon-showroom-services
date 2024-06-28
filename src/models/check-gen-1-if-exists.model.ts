import { QueryResult } from 'pg';
import client from '../utils/db';
import { jsArrayToSqlStringifiedArrayConverter } from '../utils/sql-array-converter';
import { PokemonProfile } from './PokemonProfile';

export async function checkGen1IfExists(pokemonName: string): Promise<boolean> {
	const tableName = 'all_pokemons_gen_1';
	const result: QueryResult<any> = await client.query(`
		SELECT exists (SELECT 1 FROM ${tableName} apg WHERE name = '${pokemonName}' LIMIT 1);
		`);

	const hasPokemon = result.rows[0].exists;

	return hasPokemon;
}
