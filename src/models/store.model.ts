import { QueryResult } from 'pg';
import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { jsArrayToSqlStringifiedArrayConverter, client } from '../utils';
import { StoreModelUtils } from '../interfaces/Store.interface';

export class StoreModel {
	utils: StoreModelUtils;

	constructor(utils: StoreModelUtils) {
		this.utils = utils;
	}

	public addPokemonToStore = async (
		pokemonProfile: IPokemonProfile
	): Promise<QueryResult<any>> => {
		const { name, url, sprite, types } = pokemonProfile;

		const sqlTypeNamesStringifiedArray =
			this.utils.jsArrayToSqlStringifiedArrayConverter(types);

		const result: QueryResult<any> = await client.query(`
      INSERT INTO public.stored_pokemons (name, url, sprite, types)
      VALUES ('${name}','${url}','${sprite}',ARRAY[${sqlTypeNamesStringifiedArray}]);
      `);

		return result;
	};

	public checkGen1IfExists = async (pokemonName: string): Promise<boolean> => {
		const tableName = 'all_pokemons_gen_1';
		const result: QueryResult<any> = await client.query(`
      SELECT exists (SELECT 1 FROM ${tableName} apg WHERE name = '${pokemonName}' LIMIT 1);
      `);

		const hasPokemon = result.rows[0].exists;

		return hasPokemon;
	};

	public getPokemonByNameFromStore = async (
		pokemonName: string
	): Promise<IPokemonProfile | null> => {
		const { rows } = await client.query(
			`SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE name = '${pokemonName}'`
		);

		if (!rows.length) {
			return null;
		}

		const pokemon: IPokemonProfile = rows[0];

		const sqlPokemonTypesArray = jsArrayToSqlStringifiedArrayConverter(
			pokemon.types
		);

		const { rows: pokemonTypes } = await client.query(
			`select t.* from unnest(array[${sqlPokemonTypesArray}]) type_name_s left join types t on t.type_name = type_name_s`
		);

		const pokemonProfile = {
			...pokemon,
			types: pokemonTypes
		};

		return pokemonProfile;
	};

	public deletePokemonFromStore = async (pokemonStoreId: number) => {
		const results = await client.query(
			`DELETE from stored_pokemon WHERE key_column = ${pokemonStoreId}`
		);

		return results.rowCount;
	};
}

const storeModel = new StoreModel({
	jsArrayToSqlStringifiedArrayConverter,
	client
});

export default storeModel;
