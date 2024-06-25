import { Router } from 'express';
import { getPokemonByNameController } from '../controllers/get-pokemon.controller';

const router = Router();

router.get('/getPokemonByName/:pokemonName', getPokemonByNameController);

export default router;
