import client from '../utils/db';
import { jsToSqlStringArrayConverter } from '../utils/sql-array-converter';

export async function getStoredPokemonByNameModel(pokemonName: string) {
	const { rows } = await client.query(
		`SELECT name, url, sprite, types
    FROM stored_pokemons
    WHERE name = '${pokemonName}'`
	);

	const pokemon = rows[0];

	const sqlPokemonTypesArray = jsToSqlStringArrayConverter(pokemon.types);

	const { rows: pokemonTypes } = await client.query(
		`select t.* from unnest(array[${sqlPokemonTypesArray}]) type_name_s left join types t on t.type_name = type_name_s`
	);

	const pokemonProfile = {
		...pokemon,
		types: pokemonTypes
	};

	return pokemonProfile;
}
