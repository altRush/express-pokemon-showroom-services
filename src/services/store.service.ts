import {
  PokemonComplteProfile,
  PokemonProfile,
} from '../interfaces/pokemon-profile.interface';
import { StorePokemonResponse } from '../interfaces/store.interface';
import storeModel, { StoreModel } from '../models/store.model';

export class StoreService {
  constructor(private storeModel: StoreModel) {}

  public addPokemonToStore = async (
    pokemon: PokemonProfile,
  ): Promise<StorePokemonResponse> => {
    const successResponse = { success: false };
    try {
      const { success } = await this.storeModel.addPokemonToStore(pokemon);

      if (success) {
        successResponse.success = true;
      }

      return successResponse;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw e.message;
      }
      throw e;
    }
  };

  public getPokemonByStoreIdFromStore = async (
    pokemonStoreId: string,
  ): Promise<PokemonComplteProfile | null> => {
    const pokemon =
      await this.storeModel.getPokemonByStoreIdFromStore(pokemonStoreId);

    return pokemon;
  };

  public deletePokemonByStoreIdFromStore = async (
    pokemonStoreId: number,
  ): Promise<StorePokemonResponse> => {
    const successResponse = { success: false, message: '' };

    const result = await this.storeModel.deletePokemonFromStore(pokemonStoreId);

    if (result) {
      successResponse.success = true;
    }

    return successResponse;
  };
}

const storeService = new StoreService(storeModel);

export default storeService;
