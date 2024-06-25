import { getPokemonByNameModel } from '../models/get-pokemon.model';

export const getPokemonByNameService = async (pokemonName: string) => {
	const results = await getPokemonByNameModel(pokemonName);
	return results;
};
