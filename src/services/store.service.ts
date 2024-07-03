import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { IStorePokemonResponse } from '../interfaces/Store.interface';
import storeModel, { StoreModel } from '../models/store.model';

export class StoreService {
  private storeModel: StoreModel;

  constructor(storeModel: StoreModel) {
    this.storeModel = storeModel;
  }

  public addPokemonToStore = async (
    pokemon: IPokemonProfile,
  ): Promise<IStorePokemonResponse> => {
    const successResponse = { success: false };
    try {
      const result = await this.storeModel.addPokemonToStore(pokemon);

      if (result) {
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

  public getPokemonByNameFromStore = async (
    pokemonName: string,
  ): Promise<IPokemonProfile | null> => {
    const pokemon =
      await this.storeModel.getPokemonByNameFromStore(pokemonName);

    if (!pokemon) {
      return null;
    }

    return pokemon;
  };

  public deletePokemonByStoreIdFromStore = async (
    pokemonStoreId: number,
  ): Promise<IStorePokemonResponse> => {
    const successResponse = { success: false, message: '' };

    if (typeof pokemonStoreId !== 'number') {
      successResponse.message = 'Pokemon Store ID is not a number';
      return successResponse;
    }

    const result = await this.storeModel.deletePokemonFromStore(pokemonStoreId);

    if (!result) {
      return successResponse;
    }

    successResponse.success = true;
    return successResponse;
  };
}

const storeService = new StoreService(storeModel);

export default storeService;
