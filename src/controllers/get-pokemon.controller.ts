import { Request, Response } from 'express';
import { getPokemonByNameService } from '../services/get-pokemon.service';

export const getPokemonByNameController = async (
	req: Request,
	res: Response
) => {
	const pokemonName = req.query.name as string;
	const results = await getPokemonByNameService(pokemonName);
	res.json({
		pokemons: results
	});
};
