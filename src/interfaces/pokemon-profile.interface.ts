import { PokemonTypes } from './types.interface';

export interface PokemonProfile {
  name: string;
  url: string;
  sprite: string;
  types: string[];
}

export interface PokemonComplteProfile extends Omit<PokemonProfile, 'types'> {
  types: PokemonTypes[];
}
