import { ITaskService } from '@/services';
import { ITaskController } from '../interfaces';
import { Request, Response } from 'express';

export class TaskController implements ITaskController {
  constructor(private _service: ITaskService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const tasks = await this._service.getAll();
    res.status(201).json(tasks);
  }
}
