import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { getPokemonByNameFromStoreModel } from '../models/get-pokemon-from-store.model';

export const getPokemonByNameFromStoreService = async (
	pokemonName: string
): Promise<IPokemonProfile | null> => {
	const pokemon = await getPokemonByNameFromStoreModel(pokemonName);

	if (!pokemon) {
		return null;
	}

	return pokemon;
};
