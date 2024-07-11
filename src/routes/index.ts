import { Router } from 'express';
import storeController from '../controllers/store.controller';
import trainerController from '../controllers/trainer.controller';

const router = Router();
const {
  getPokemonByStoreIdFromStore,
  addPokemonToStore,
  deletePokemonFromStore,
} = storeController;
const { addTrainer, getTrainer } = trainerController;

router.get('/store/:pokemonStoreId', getPokemonByStoreIdFromStore);
router.post('/store', addPokemonToStore);
router.delete('/store', deletePokemonFromStore);
router.post('/trainer', addTrainer);
router.get('/trainer/:trainerId', getTrainer);

export default router;
