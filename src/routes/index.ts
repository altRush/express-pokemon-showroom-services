import { Router } from 'express';
import { getStoredPokemonByNameController } from '../controllers/get-stored-pokemon.controller';

const router = Router();

router.get(
	'/getStoredPokemonByName/:pokemonName',
	getStoredPokemonByNameController
);

export default router;
