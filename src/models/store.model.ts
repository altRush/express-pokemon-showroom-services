import {
  PokemonComplteProfile,
  PokemonProfile,
} from '../interfaces/pokemon-profile.interface';
import { jsArrayToSqlArrayConverter } from '../utils';
import {
  StorePokemonResponse,
  JsArrayToSqlArrayConverter,
} from '../interfaces/store.interface';
import dbPool from '../services/db.service';
import { Pool, QueryResult } from 'pg';
import { PokemonTypes } from '../interfaces/types.interface';

export class StoreModel {
  constructor(
    public jsArrayToSqlArrayConverter: JsArrayToSqlArrayConverter,
    private pool: Pool,
  ) {
    this.jsArrayToSqlArrayConverter = jsArrayToSqlArrayConverter;
  }

  public addPokemonToStore = async (
    pokemonProfile: PokemonProfile,
  ): Promise<StorePokemonResponse> => {
    const successResponse = {
      success: false,
    };
    const { name, url, sprite, types } = pokemonProfile;

    const sqlTypeNamesStringifiedArray = this.jsArrayToSqlArrayConverter(types);

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
  ): Promise<PokemonComplteProfile | null> => {
    const { rowCount, rows } = await dbPool.query(
      `SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE name = '${pokemonName}'`,
    );

    if (!rowCount) {
      return null;
    }

    const pokemon: PokemonProfile = rows[0];

    const sqlPokemonTypesArray = this.jsArrayToSqlArrayConverter(pokemon.types);

    const { rows: pokemonTypes } = (await dbPool.query(
      `select t.* from unnest(array[${sqlPokemonTypesArray}]) type_name_s left join types t on t.type_name = type_name_s`,
    )) as QueryResult<PokemonTypes>;

    const pokemonProfile: PokemonComplteProfile = {
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

const storeModel = new StoreModel(jsArrayToSqlArrayConverter, dbPool);

export default storeModel;
