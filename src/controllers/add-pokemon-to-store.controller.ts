import { Request, Response } from 'express';
import { addPokemonToStoreService } from '../services/add-pokemon-to-store.service';
import HttpStatusCode from '../constants/http-statuses.enums';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';

export const addPokemonToStoreController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { pokemon } = req.body;
		const success = await addPokemonToStoreService(pokemon);

		if (success) {
			res.json({
				code: HttpStatusCode.CREATED,
				message: HttpResponseMessage.ADD_SUCCESS
			});
			return;
		}

		res.json({
			code: HttpStatusCode.BAD_REQUEST,
			message: HttpResponseMessage.ADD_FAILED
		});
	} catch (e) {
		res.json({
			code: HttpStatusCode.SERVICE_UNAVAILABLE,
			error: e,
			message: HttpResponseMessage.ADD_FAILED
		});
	}
};
