import { Router } from 'express';
import { getPokemonByNameController } from '../controllers/get-pokemon.controller';

const router = Router();

router.get('/getPokemonByName', getPokemonByNameController);

export default router;
