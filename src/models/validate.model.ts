import { Pool, QueryResult } from 'pg';
import dbPool from '../services/db.service';

export class ValidateModel {
  constructor(private dbPool: Pool) {}
  public checkGen1IfExists = async (pokemonName: string): Promise<boolean> => {
    const tableName = 'all_pokemons_gen_1';
    const result: QueryResult<any> = await this.dbPool.query(`
      SELECT exists (SELECT 1 FROM ${tableName} apg WHERE name = '${pokemonName}' LIMIT 1);
      `);

    const hasPokemon = result.rows[0].exists;

    return hasPokemon;
  };
}

export default new ValidateModel(dbPool);
