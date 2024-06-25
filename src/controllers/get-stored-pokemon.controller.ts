import { Request, Response } from 'express';
import { getStoredPokemonByNameService } from '../services/get-stored-pokemon.service';

export const getStoredPokemonByNameController = async (
	req: Request,
	res: Response
) => {
	const { pokemonName } = req.params;
	const results = await getStoredPokemonByNameService(pokemonName);
	res.json({
		pokemons: results
	});
};
