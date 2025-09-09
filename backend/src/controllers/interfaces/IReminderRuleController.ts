import { Request, Response } from 'express';

export interface IReminderRuleController {
  create(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
}
