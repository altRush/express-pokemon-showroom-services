import { QueryResult } from 'pg';
import client from '../utils/db';
import { jsArrayToSqlStringifiedArrayConverter } from '../utils/sql-array-converter';
import { PokemonProfile } from './PokemonProfile';

export async function addPokemonToStoreModel(
	pokemonProfile: PokemonProfile
): Promise<QueryResult<any>> {
	const { name, url, sprite, types } = pokemonProfile;

	const sqlTypeNamesStringifiedArray =
		jsArrayToSqlStringifiedArrayConverter(types);

	const result: QueryResult<any> = await client.query(`
		INSERT INTO public.stored_pokemons (name, url, sprite, types)
		VALUES ('${name}','${url}','${sprite}',ARRAY[${sqlTypeNamesStringifiedArray}]);
		`);

	return result;
}
