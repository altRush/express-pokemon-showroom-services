import { PokemonProfile } from '../models/PokemonProfile';
import { getStoredPokemonByNameModel } from '../models/get-stored-pokemon.model';

export const getStoredPokemonByNameService = async (
	pokemonName: string
): Promise<PokemonProfile | null> => {
	const pokemon = await getStoredPokemonByNameModel(pokemonName);

	if (!pokemon) {
		return null;
	}

	return pokemon;
};
