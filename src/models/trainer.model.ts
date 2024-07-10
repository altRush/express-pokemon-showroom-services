import { Pool } from 'pg';
import dbPool from '../services/db.service';
import { TrainerResponse } from '../interfaces/trainer.interface';

export class TrainerModel {
  constructor(private pool: Pool) {
    this.pool = pool;
  }

  addTrainer = async (trainerName: string): Promise<TrainerResponse> => {
    const successResponse = {
      success: false,
    };

    const { rowCount, command } = await this.pool
      .query(`INSERT INTO public.trainer
      (trainer_id, trainer_name, pokemon_store_id_array)
      VALUES(gen_random_uuid(), '${trainerName}', '{}')`);

    if (command === 'INSERT' && rowCount && rowCount > 0) {
      successResponse.success = true;
    }

    return successResponse;
  };
}

const trainerModel = new TrainerModel(dbPool);

export default trainerModel;
