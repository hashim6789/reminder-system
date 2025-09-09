import { Request, Response } from 'express';

export interface IAuditLogController {
  getAll(req: Request, res: Response): Promise<void>;
}
