import { getStoredPokemonByNameModel } from '../models/get-stored-pokemon.model';

export const getStoredPokemonByNameService = async (pokemonName: string) => {
	const results = await getStoredPokemonByNameModel(pokemonName);
	return results;
};
