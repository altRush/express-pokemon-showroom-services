import { QueryResult } from 'pg';
import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { jsArrayToSqlStringifiedArrayConverter, client } from '../utils';
import {
	IStoreModelUtils,
	IStorePokemonResponse
} from '../interfaces/Store.interface';

export class StoreModel {
	utils: IStoreModelUtils;

	constructor(utils: IStoreModelUtils) {
		this.utils = utils;
	}

	public addPokemonToStore = async (
		pokemonProfile: IPokemonProfile
	): Promise<IStorePokemonResponse> => {
		let successResponse = {
			success: false
		};
		const { name, url, sprite, types } = pokemonProfile;

		const sqlTypeNamesStringifiedArray =
			this.utils.jsArrayToSqlStringifiedArrayConverter(types);

		const { command, rowCount } = await client.query(`
      INSERT INTO public.stored_pokemons (name, url, sprite, types)
      VALUES ('${name}','${url}','${sprite}',ARRAY[${sqlTypeNamesStringifiedArray}]);
      `);

		if (command === 'INSERT' && rowCount) {
			successResponse.success = true;
		}

		return successResponse;
	};

	public getPokemonByNameFromStore = async (
		pokemonName: string
	): Promise<IPokemonProfile | null> => {
		const { rowCount, rows } = await client.query(
			`SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE name = '${pokemonName}'`
		);

		if (!rowCount) {
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

	public deletePokemonFromStore = async (
		pokemonStoreId: number
	): Promise<number | null> => {
		const results = await client.query(
			`DELETE from stored_pokemons WHERE pokemon_store_id = ${pokemonStoreId}`
		);

		return results.rowCount;
	};
}

const storeModel = new StoreModel({
	jsArrayToSqlStringifiedArrayConverter,
	client
});

export default storeModel;
