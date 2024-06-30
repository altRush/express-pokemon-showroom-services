import { Request, Response } from 'express';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';
import HttpStatusCode from '../constants/http-statuses.enums';
import storeService, { StoreService } from '../services/store.service';
import validateService, { ValidateService } from '../services/validate.service';

class StoreController {
	storeService: StoreService;
	validateService: ValidateService;

	constructor(storeService: StoreService, validateService: ValidateService) {
		this.storeService = storeService;
		this.validateService = validateService;
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
			const hasPokemon = await this.validateService.checkGen1IfExists(
				pokemonName
			);

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
			const successResponse = await this.storeService.addPokemonToStoreService(
				pokemon
			);

			if (!successResponse.success) {
				res.status(HttpStatusCode.BAD_REQUEST).json({
					message: HttpResponseMessage.ADD_FAILED
				});
				return;
			}

			res.status(HttpStatusCode.CREATED).json({
				message: HttpResponseMessage.ADD_SUCCESS
			});
		} catch (e) {
			res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
				error: e,
				message: HttpResponseMessage.ADD_FAILED
			});
		}
	};

	public deletePokemonFromStore = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { pokemonStoreId } = req.body;

		try {
			const successResponse =
				await this.storeService.deletePokemonByNameFromStore(pokemonStoreId);

			if (!successResponse.success) {
				if (successResponse.message === 'Pokemon ID is not a number') {
					res.status(HttpStatusCode.BAD_REQUEST).json({
						message: HttpResponseMessage.DELETE_FAILED_NAN
					});
					return;
				}

				res.status(HttpStatusCode.NOT_FOUND).json({
					message: HttpResponseMessage.DELETE_NOT_FOUND
				});
				return;
			}

			res.status(HttpStatusCode.OK).json({
				message: HttpResponseMessage.DELETE_SUCCESS
			});
		} catch (e) {
			res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
				error: e,
				message: HttpResponseMessage.DELETE_FAILED
			});
		}
	};
}

const storeController = new StoreController(storeService, validateService);

export default storeController;
