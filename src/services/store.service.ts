import { IPokemonProfile } from '../interfaces/PokemonProfile.interface';
import { IStoreModel } from '../interfaces/Store.interface';
import { storeModel } from '../models';

export class StoreService {
	private storeModel: IStoreModel;

	constructor(storeModel: IStoreModel) {
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

	public async checkGen1IfExists(pokemonName: string): Promise<boolean> {
		const hasPokemon = this.storeModel.checkGen1IfExists(pokemonName);

		return hasPokemon;
	}
}

const storeService = new StoreService(storeModel);

export default storeService;
