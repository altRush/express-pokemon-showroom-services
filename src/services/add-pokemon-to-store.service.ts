import { PokemonProfile } from '../models/PokemonProfile';
import { addPokemonToStoreModel } from '../models/add-pokemon-to-store.model';

export const addPokemonToStoreService = async (pokemon: PokemonProfile) => {
	try {
		const results = await addPokemonToStoreModel(pokemon);
		return results;
	} catch (e: unknown) {
		if (e instanceof Error) {
			throw e.message;
		}
		throw e;
	}
};
