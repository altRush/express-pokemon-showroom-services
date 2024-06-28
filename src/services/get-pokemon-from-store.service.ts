import { PokemonProfile } from '../models/PokemonProfile';
import { checkGen1IfExists } from '../models/check-gen-1-if-exists.model';
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
