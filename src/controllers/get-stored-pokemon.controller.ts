import { Request, Response } from 'express';
import { getStoredPokemonByNameService } from '../services/get-stored-pokemon.service';
import HttpStatusCode from '../constants/http-statuses.enums';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';
import { checkGen1IfExists } from '../models/check-gen-1-if-exists.model';

export const getStoredPokemonByNameController = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { pokemonName } = req.params;

	if (!pokemonName) {
		res.json({
			code: HttpStatusCode.BAD_REQUEST,
			message: HttpResponseMessage.GET_FAIL
		});
		return;
	}

	try {
		const hasPokemon = await checkGen1IfExists(pokemonName);

		if (!hasPokemon) {
			res.json({
				code: HttpStatusCode.BAD_REQUEST,
				message: HttpResponseMessage.GET_UNKNOWN
			});
			return;
		}

		const pokemonProfileByName = await getStoredPokemonByNameService(
			pokemonName
		);

		if (pokemonProfileByName === null) {
			res.json({
				code: HttpStatusCode.NOT_FOUND,
				message: HttpResponseMessage.GET_NOT_FOUND
			});
			return;
		}

		res.json({
			code: HttpStatusCode.OK,
			message: HttpResponseMessage.GET_SUCCESS,
			pokemon: pokemonProfileByName
		});
	} catch (e) {
		res.json({
			code: HttpStatusCode.SERVICE_UNAVAILABLE,
			error: e
		});
	}
};
