import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { IStorePokemonResponse } from '../interfaces/Store.interface';
import storeModel, { StoreModel } from '../models/store.model';

export class StoreService {
	private storeModel: StoreModel;

	constructor(storeModel: StoreModel) {
		this.storeModel = storeModel;
	}

	public addPokemonToStoreService = async (
		pokemon: IPokemonProfile
	): Promise<IStorePokemonResponse> => {
		let successResponse = { success: false };
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
		pokemonName: string
	): Promise<IPokemonProfile | null> => {
		const pokemon = await this.storeModel.getPokemonByNameFromStore(
			pokemonName
		);

		if (!pokemon) {
			return null;
		}

		return pokemon;
	};

	public deletePokemonByNameFromStore = async (
		pokemonNameId: number
	): Promise<IStorePokemonResponse> => {
		let successResponse = { success: false, message: '' };

		if (typeof pokemonNameId !== 'number') {
			successResponse.message = 'Pokemon ID is not a number';
			return successResponse;
		}

		const result = await this.storeModel.deletePokemonFromStore(pokemonNameId);

		if (!result) {
			return successResponse;
		}

		successResponse.success = true;
		return successResponse;
	};
}

const storeService = new StoreService(storeModel);

export default storeService;
