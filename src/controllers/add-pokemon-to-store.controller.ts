import { Request, Response } from 'express';
import { addPokemonToStoreService } from '../services/add-pokemon-to-store.service';

export const addPokemonToStoreController = async (
	req: Request,
	res: Response
) => {
	const { pokemon } = req.body;
	const results = await addPokemonToStoreService(pokemon);
	res.json({
		results
	});
};
