import { PokemonProfile } from './pokemon-profile.interface';

export interface TrainerResponse {
  success: boolean;
  message?: string;
}

export interface TrainerRawProfile {
  trainerId: string;
  trainerName: string;
  pokemonStoreIdArray: number[];
}

export interface TrainerProfile
  extends Omit<TrainerRawProfile, 'pokemonStoreIdArray'> {
  pokemons: PokemonProfile[];
}
