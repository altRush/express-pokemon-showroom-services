import { PokemonProfile } from '../interfaces/PokemonProfile.interface';
import { addPokemonToStoreModel } from '../models/add-pokemon-to-store.model';

export const addPokemonToStoreService = async (
	pokemon: PokemonProfile
): Promise<boolean> => {
	try {
		const { command, rowCount } = await addPokemonToStoreModel(pokemon);

		let success = false;

		if (command === 'INSERT' && rowCount && rowCount >= 1) {
			success = true;
		}

		return success;
	} catch (e: unknown) {
		if (e instanceof Error) {
			throw e.message;
		}
		throw e;
	}
};
