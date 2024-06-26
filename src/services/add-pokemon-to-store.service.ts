import { PokemonProfile } from '../models/PokemonProfile';
import { addPokemonToStoreModel } from '../models/add-pokemon-to-store.model';

export const addPokemonToStoreService = async (pokemon: PokemonProfile) => {
	const results = await addPokemonToStoreModel(pokemon);
	return results;
};
