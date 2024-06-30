import { Router } from 'express';
import storeController from '../controllers/store.controller';

const router = Router();
const { getPokemonByNameFromStore, addPokemonToStore, deletePokemonFromStore } =
	storeController;

router.get('/store/:pokemonName', getPokemonByNameFromStore);
router.post('/store', addPokemonToStore);
router.delete('/store', deletePokemonFromStore);

export default router;
