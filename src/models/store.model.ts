import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { jsArrayToSqlStringifiedArrayConverter, dbPool } from '../utils';
import {
  IStoreModelUtils,
  IStorePokemonResponse,
} from '../interfaces/Store.interface';

export class StoreModel {
  constructor(public utils: IStoreModelUtils) {
    this.utils = utils;
  }

  public addPokemonToStore = async (
    pokemonProfile: IPokemonProfile,
  ): Promise<IStorePokemonResponse> => {
    const successResponse = {
      success: false,
    };
    const { name, url, sprite, types } = pokemonProfile;

    const sqlTypeNamesStringifiedArray =
      this.utils.jsArrayToSqlStringifiedArrayConverter(types);

    const { command, rowCount } = await dbPool.query(`
      INSERT INTO public.stored_pokemons (name, url, sprite, types)
      VALUES ('${name}','${url}','${sprite}',ARRAY[${sqlTypeNamesStringifiedArray}]);
      `);

    if (command === 'INSERT' && rowCount) {
      successResponse.success = true;
    }

    return successResponse;
  };

  public getPokemonByNameFromStore = async (
    pokemonName: string,
  ): Promise<IPokemonProfile | null> => {
    const { rowCount, rows } = await dbPool.query(
      `SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE name = '${pokemonName}'`,
    );

    if (!rowCount) {
      return null;
    }

    const pokemon: IPokemonProfile = rows[0];

    const sqlPokemonTypesArray = jsArrayToSqlStringifiedArrayConverter(
      pokemon.types,
    );

    const { rows: pokemonTypes } = await dbPool.query(
      `select t.* from unnest(array[${sqlPokemonTypesArray}]) type_name_s left join types t on t.type_name = type_name_s`,
    );

    const pokemonProfile = {
      ...pokemon,
      types: pokemonTypes,
    };

    return pokemonProfile;
  };

  public deletePokemonFromStore = async (
    pokemonStoreId: number,
  ): Promise<number | null> => {
    const results = await dbPool.query(
      `DELETE from stored_pokemons WHERE pokemon_store_id = ${pokemonStoreId}`,
    );

    return results.rowCount;
  };
}

const storeModel = new StoreModel({
  jsArrayToSqlStringifiedArrayConverter,
  dbPool,
});

export default storeModel;
