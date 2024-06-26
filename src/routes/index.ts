import { Router } from 'express';
import {
	addPokemonToStoreController,
	getStoredPokemonByNameController
} from '../controllers';

const router = Router();

router.get(
	'/getStoredPokemonByName/:pokemonName',
	getStoredPokemonByNameController
);

router.post('/addPokemonToStore', addPokemonToStoreController);

export default router;
