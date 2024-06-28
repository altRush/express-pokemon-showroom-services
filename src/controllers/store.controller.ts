import { Request, Response } from 'express';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';
import HttpStatusCode from '../constants/http-statuses.enums';
import { addPokemonToStoreService } from '../services/add-pokemon-to-store.service';
import { checkGen1IfExists } from '../models/check-gen-1-if-exists.model';
import { getPokemonByNameFromStoreService } from '../services/get-pokemon-from-store.service';

export class StoreController {
	public async getStoredPokemonByName(
		req: Request,
		res: Response
	): Promise<void> {
		const { pokemonName } = req.params;

		if (!pokemonName) {
			res.status(HttpStatusCode.BAD_REQUEST).json({
				message: HttpResponseMessage.GET_FAIL
			});
			return;
		}

		try {
			const hasPokemon = await checkGen1IfExists(pokemonName);

			if (!hasPokemon) {
				res.status(HttpStatusCode.BAD_REQUEST).json({
					message: HttpResponseMessage.GET_UNKNOWN
				});
				return;
			}

			const pokemonProfileByName = await getPokemonByNameFromStoreService(
				pokemonName
			);

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
	}

	public async addPokemonToStore(req: Request, res: Response): Promise<void> {
		try {
			const { pokemon } = req.body;
			const success = await addPokemonToStoreService(pokemon);

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
	}
}
