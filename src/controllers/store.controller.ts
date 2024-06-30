import { Request, Response } from 'express';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';
import HttpStatusCode from '../constants/http-statuses.enums';
import storeService, { StoreService } from '../services/store.service';

class StoreController {
	storeService: StoreService;

	constructor(storeService: StoreService) {
		this.storeService = storeService;
	}

	public getPokemonByNameFromStore = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { pokemonName } = req.params;

		if (!pokemonName) {
			res.status(HttpStatusCode.BAD_REQUEST).json({
				message: HttpResponseMessage.GET_FAIL
			});
			return;
		}

		try {
			const hasPokemon = await this.storeService.checkGen1IfExists(pokemonName);

			if (!hasPokemon) {
				res.status(HttpStatusCode.BAD_REQUEST).json({
					message: HttpResponseMessage.GET_UNKNOWN
				});
				return;
			}

			const pokemonProfileByName =
				await this.storeService.getPokemonByNameFromStore(pokemonName);

			if (pokemonProfileByName === null) {
				res.status(HttpStatusCode.NOT_FOUND).json({
					message: HttpResponseMessage.GET_NOT_FOUND
				});
				return;
			}

			res.status(HttpStatusCode.OK).json({
				message: HttpResponseMessage.GET_SUCCESS,
				pokemon: pokemonProfileByName
			});
		} catch (e) {
			res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
				error: e
			});
		}
	};

	public addPokemonToStore = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { pokemon } = req.body;
			const success = await this.storeService.addPokemonToStoreService(pokemon);

			if (success) {
				res.status(HttpStatusCode.CREATED).json({
					message: HttpResponseMessage.ADD_SUCCESS
				});
				return;
			}

			res.status(HttpStatusCode.BAD_REQUEST).json({
				message: HttpResponseMessage.ADD_FAILED
			});
		} catch (e) {
			res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
				error: e,
				message: HttpResponseMessage.ADD_FAILED
			});
		}
	};
}

const storeController = new StoreController(storeService);

export default storeController;
