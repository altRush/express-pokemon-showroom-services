import { Request, Response } from 'express';
import { addPokemonToStoreService } from '../services/add-pokemon-to-store.service';
import HttpStatusCode from '../constants/http-statuses.enums';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';

export const addPokemonToStoreController = async (
	req: Request,
	res: Response
) => {
	try {
		const { pokemon } = req.body;
		const { command, rowCount } = await addPokemonToStoreService(pokemon);

		if (command === 'INSERT' && rowCount && rowCount >= 1) {
			res.json({
				code: HttpStatusCode.CREATED,
				command,
				message: HttpResponseMessage.ADD_SUCCESS
			});
			return;
		}
	} catch (e) {
		res.json({
			code: HttpStatusCode.SERVICE_UNAVAILABLE,
			error: e,
			message: HttpResponseMessage.ADD_FAILED
		});
	}
};
