import { Router } from 'express';
import storeController from '../controllers/store.controller';

const router = Router();
const { getPokemonByNameFromStore, addPokemonToStore } = storeController;

router.get('/store/:pokemonName', getPokemonByNameFromStore);

router.post('/store', addPokemonToStore);

export default router;
