import { Request, Response } from 'express';
import { StoreHttpResponseMessage } from '../constants/http-response-messages.enums';
import HttpStatusCode from '../constants/http-statuses.enums';
import storeService, { StoreService } from '../services/store.service';
import validateService, { ValidateService } from '../services/validate.service';

class StoreController {
  constructor(
    public storeService: StoreService,
    public validateService: ValidateService,
  ) {
    this.storeService = storeService;
    this.validateService = validateService;
  }

  public getPokemonByNameFromStore = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { pokemonName } = req.params;

    if (typeof pokemonName !== 'string') {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StoreHttpResponseMessage.GET_FAIL_NOT_STRING,
      });
      return;
    }

    if (!pokemonName) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StoreHttpResponseMessage.GET_FAIL,
      });
      return;
    }

    try {
      const isPokemonNameValid =
        await this.validateService.checkGen1IfExists(pokemonName);

      if (!isPokemonNameValid) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: StoreHttpResponseMessage.GET_UNKNOWN,
        });
        return;
      }

      const pokemonProfileByName =
        await this.storeService.getPokemonByNameFromStore(pokemonName);

      if (pokemonProfileByName === null) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          message: StoreHttpResponseMessage.GET_NOT_FOUND,
        });
        return;
      }

      res.status(HttpStatusCode.OK).json({
        message: StoreHttpResponseMessage.GET_SUCCESS,
        pokemon: pokemonProfileByName,
      });
    } catch (e) {
      res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
        error: e,
      });
    }
  };

  public addPokemonToStore = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { name: pokemonName } = req.body;

      if (typeof pokemonName !== 'string') {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: StoreHttpResponseMessage.ADD_FAILED_NOT_STRING,
        });
        return;
      }

      const isPokemonNameValid =
        await this.validateService.checkGen1IfExists(pokemonName);

      if (!isPokemonNameValid) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: StoreHttpResponseMessage.GET_UNKNOWN,
        });
        return;
      }

      const successResponse = await this.storeService.addPokemonToStore(
        req.body,
      );

      if (!successResponse.success) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: StoreHttpResponseMessage.ADD_FAILED,
        });
        return;
      }

      res.status(HttpStatusCode.CREATED).json({
        message: StoreHttpResponseMessage.ADD_SUCCESS,
      });
    } catch (e) {
      res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
        error: e,
        message: StoreHttpResponseMessage.ADD_FAILED,
      });
    }
  };

  public deletePokemonFromStore = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { pokemonStoreId } = req.body;

    if (typeof pokemonStoreId !== 'number') {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StoreHttpResponseMessage.DELETE_FAILED_NAN,
      });
      return;
    }

    try {
      const successResponse =
        await this.storeService.deletePokemonByStoreIdFromStore(pokemonStoreId);

      if (!successResponse.success) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          message: StoreHttpResponseMessage.DELETE_NOT_FOUND,
        });
        return;
      }

      res.status(HttpStatusCode.OK).json({
        message: StoreHttpResponseMessage.DELETE_SUCCESS,
      });
    } catch (e) {
      res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({
        error: e,
        message: StoreHttpResponseMessage.DELETE_FAILED,
      });
    }
  };
}

const storeController = new StoreController(storeService, validateService);

export default storeController;
