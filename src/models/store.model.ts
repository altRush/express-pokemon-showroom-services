import { PokemonProfile } from '../interfaces/PokemonProfile.interface';
import { jsArrayToSqlStringifiedArrayConverter } from '../utils';
import {
  StorePokemonResponse,
  JsArrayToSqlStringifiedArrayConverter,
} from '../interfaces/Store.interface';
import dbPool from '../services/db.service';
import { Pool } from 'pg';

export class StoreModel {
  constructor(
    public jsArrayToSqlStringifiedArrayConverter: JsArrayToSqlStringifiedArrayConverter,
    private pool: Pool,
  ) {
    this.jsArrayToSqlStringifiedArrayConverter =
      jsArrayToSqlStringifiedArrayConverter;
    this.pool = pool;
  }

  public addPokemonToStore = async (
    pokemonProfile: PokemonProfile,
  ): Promise<StorePokemonResponse> => {
    const successResponse = {
      success: false,
    };
    const { name, url, sprite, types } = pokemonProfile;

    const sqlTypeNamesStringifiedArray =
      this.jsArrayToSqlStringifiedArrayConverter(types);

    const { command, rowCount } = await this.pool.query(`
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
  ): Promise<PokemonProfile | null> => {
    const { rowCount, rows } = await dbPool.query(
      `SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE name = '${pokemonName}'`,
    );

    if (!rowCount) {
      return null;
    }

    const pokemon: PokemonProfile = rows[0];

    const sqlPokemonTypesArray = this.jsArrayToSqlStringifiedArrayConverter(
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
    const results = await this.pool.query(
      `DELETE from stored_pokemons WHERE pokemon_store_id = ${pokemonStoreId}`,
    );

    return results.rowCount;
  };
}

const storeModel = new StoreModel(
  jsArrayToSqlStringifiedArrayConverter,
  dbPool,
);

export default storeModel;
