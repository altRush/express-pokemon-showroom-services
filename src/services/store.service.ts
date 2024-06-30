import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import storeModel, { StoreModel } from '../models/store.model';

export class StoreService {
	private storeModel: StoreModel;

	constructor(storeModel: StoreModel) {
		this.storeModel = storeModel;
	}

	public addPokemonToStoreService = async (
		pokemon: IPokemonProfile
	): Promise<boolean> => {
		try {
			const { command, rowCount } = await this.storeModel.addPokemonToStore(
				pokemon
			);

			let success = false;

			if (command === 'INSERT' && rowCount && rowCount >= 1) {
				success = true;
			}

			return success;
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
}

const storeService = new StoreService(storeModel);

export default storeService;
