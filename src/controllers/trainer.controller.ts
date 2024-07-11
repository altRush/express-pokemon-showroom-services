import { Request, Response } from 'express';
import trainerService, { TrainerService } from '../services/trainer.service';
import HttpStatusCode from '../constants/http-statuses.enums';
import { TrainerHttpResponseMessage } from '../constants/http-response-messages.enums';

export class TrainerController {
  constructor(private trainerService: TrainerService) {
    this.trainerService = trainerService;
  }

  addTrainer = async (req: Request, res: Response): Promise<void> => {
    const { name: trainerName } = req.body;

    if (typeof trainerName !== 'string') {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: TrainerHttpResponseMessage.ADD_FAILED_NOT_STRING,
      });
      return;
    }

    const { success } = await this.trainerService.addTrainer(trainerName);

    if (!success) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: TrainerHttpResponseMessage.ADD_FAILED,
      });
      return;
    }

    res.status(HttpStatusCode.CREATED).json({
      message: TrainerHttpResponseMessage.ADD_SUCCESS,
    });
  };

  getTrainer = async (req: Request, res: Response): Promise<void> => {
    const { trainerId } = req.params;

    if (typeof trainerId !== 'string') {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: TrainerHttpResponseMessage.GET_FAILED_NOT_STRING,
      });
      return;
    }

    const trainer = await this.trainerService.getTrainer(trainerId);

    if (!trainer) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: TrainerHttpResponseMessage.GET_NOT_FOUND,
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      message: TrainerHttpResponseMessage.GET_SUCCESS,
      trainer,
    });
  };
}

const trainerController = new TrainerController(trainerService);

export default trainerController;
