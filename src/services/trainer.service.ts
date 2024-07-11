import { TrainerResponse } from '../interfaces/trainer.interface';
import trainerModel, { TrainerModel } from '../models/trainer.model';

export class TrainerService {
  constructor(private trainerModel: TrainerModel) {
    this.trainerModel = trainerModel;
  }

  addTrainer = async (trainerName: string): Promise<TrainerResponse> => {
    const successResponse = {
      success: false,
    };
    const { success } = await this.trainerModel.addTrainer(trainerName);

    if (success) {
      successResponse.success = true;
    }

    return successResponse;
  };

  getTrainer = async (trainerId: string) => {
    const trainer = await this.trainerModel.getTrainer(trainerId);

    return trainer;
  };
}

const trainerService = new TrainerService(trainerModel);

export default trainerService;
