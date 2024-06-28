import { PokemonProfile } from '../interfaces/PokemonProfile.interface';
import { getStoredPokemonByNameModel } from '../models/get-pokemon-from-store.model';

export const getPokemonByNameFromStoreService = async (
	pokemonName: string
): Promise<PokemonProfile | null> => {
	const pokemon = await getStoredPokemonByNameModel(pokemonName);

	if (!pokemon) {
		return null;
	}

	return pokemon;
};
