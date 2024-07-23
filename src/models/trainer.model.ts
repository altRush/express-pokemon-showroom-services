import { Pool, QueryResult } from 'pg';
import dbPool from '../services/db.service';
import { TrainerResponse } from '../interfaces/trainer.interface';
import { jsArrayToSqlArrayConverter } from '../utils';
import { JsArrayToSqlArrayConverter } from '../interfaces/store.interface';
import { PokemonProfile } from '../interfaces/pokemon-profile.interface';
export class TrainerModel {
  constructor(
    private pool: Pool,
    private jsArrayToSqlArrayConverter: JsArrayToSqlArrayConverter,
  ) {}

  addTrainer = async (trainerName: string): Promise<TrainerResponse> => {
    const successResponse = {
      success: false,
    };

    const { rowCount, command } = await this.pool.query(`INSERT INTO trainers
      (trainer_id, trainer_name, pokemon_store_id_array)
      VALUES(gen_random_uuid(), '${trainerName}', '{}')`);

    if (command === 'INSERT' && rowCount && rowCount > 0) {
      successResponse.success = true;
    }

    return successResponse;
  };

  getTrainer = async (trainerId: string) => {
    const { rowCount, rows } = await this.pool.query(
      `SELECT trainer_id, trainer_name, pokemon_store_id_array
      FROM trainers
      WHERE trainer_id = '${trainerId}'`,
    );

    if (!rowCount) {
      return null;
    }

    const trainerRawProfile = rows[0];

    const sqlPokemonIdsArray = this.jsArrayToSqlArrayConverter(
      trainerRawProfile.pokemon_store_id_array,
    );

    const { rows: pokemons } = (await dbPool.query(
      `select sp.* from unnest(array[${sqlPokemonIdsArray}]) trainer_pokemon_id left join stored_pokemons sp on sp.pokemon_store_id = (trainer_pokemon_id :: bigint)`,
    )) as QueryResult<PokemonProfile>;

    const trainerProfile = {
      ...trainerRawProfile,
      pokemons,
    };

    return trainerProfile;
  };
}

const trainerModel = new TrainerModel(dbPool, jsArrayToSqlArrayConverter);

export default trainerModel;
