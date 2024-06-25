import { getStoredPokemonByNameModel } from '../models/get-pokemon.model';

export const getPokemonByNameService = async (pokemonName: string) => {
	const results = await getStoredPokemonByNameModel(pokemonName);
	return results;
};
