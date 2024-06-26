import sql from '../utils/db';
import { PokemonProfile } from './PokemonProfile';

export async function addPokemonToStoreModel(pokemonProfile: PokemonProfile) {
	const { name, url, sprite, types } = pokemonProfile;

	const result = await sql`
	  INSERT INTO public.stored_pokemons
			(pokemon_name, url, sprite)
		VALUES
			(${name},${url},${sprite});
	`;
	return result;
}
