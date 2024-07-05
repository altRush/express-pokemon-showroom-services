import validateModel, { ValidateModel } from '../models/validate.model';

export class ValidateService {
  constructor(private validateModel: ValidateModel) {
    this.validateModel = validateModel;
  }

  public checkGen1IfExists = async (pokemonName: string): Promise<boolean> => {
    const hasPokemon = this.validateModel.checkGen1IfExists(pokemonName);

    return hasPokemon;
  };
}

const validateService = new ValidateService(validateModel);

export default validateService;
