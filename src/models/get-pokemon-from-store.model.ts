import client from '../utils/db';
import { jsArrayToSqlStringifiedArrayConverter } from '../utils/sql-array-converter';
import { PokemonProfile } from '../interfaces/PokemonProfile.interface';

export async function getStoredPokemonByNameModel(
	pokemonName: string
): Promise<PokemonProfile | null> {
	const { rows } = await client.query(
		`SELECT name, url, sprite, types
    FROM stored_pokemons
    WHERE name = '${pokemonName}'`
	);

	if (!rows.length) {
		return null;
	}

	const pokemon: PokemonProfile = rows[0];

	const sqlPokemonTypesArray = jsArrayToSqlStringifiedArrayConverter(
		pokemon.types
	);

	const { rows: pokemonTypes } = await client.query(
		`select t.* from unnest(array[${sqlPokemonTypesArray}]) type_name_s left join types t on t.type_name = type_name_s`
	);

	const pokemonProfile = {
		...pokemon,
		types: pokemonTypes
	};

	return pokemonProfile;
}
