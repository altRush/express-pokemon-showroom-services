import client from '../utils/db';
import { jsToSqlStringArrayConverter } from '../utils/sql-array-converter';
import { PokemonProfile } from './PokemonProfile';

export async function addPokemonToStoreModel(pokemonProfile: PokemonProfile) {
	const { name, url, sprite, types } = pokemonProfile;

	const typeNamesArray = types.map(type => type.type.name);

	const sqlTypeNamesArray = jsToSqlStringArrayConverter(typeNamesArray);

	const result = await client.query(`
		INSERT INTO public.stored_pokemons (name, url, sprite, types)
		VALUES ('${name}', '${url}','${sprite}',ARRAY[${sqlTypeNamesArray}]);
		`);

	return result;
}
