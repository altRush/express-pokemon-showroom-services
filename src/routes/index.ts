import { Router } from 'express';
import { StoreController } from '../controllers';

const router = Router();
const { getStoredPokemonByName, addPokemonToStore } = new StoreController();

router.get('/store/:pokemonName', getStoredPokemonByName);

router.post('/store', addPokemonToStore);

export default router;
