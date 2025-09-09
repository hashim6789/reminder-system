import { Request, Response } from 'express';

export interface ITaskController {
  getAll(req: Request, res: Response): Promise<void>;
}
