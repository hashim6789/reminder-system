import { IAuditLogService } from '@/services';
import { IAuditLogController } from '../interfaces';
import { Request, Response } from 'express';

export class AuditLogController implements IAuditLogController {
  constructor(private _service: IAuditLogService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const auditLogs = await this._service.findAll();
    res.status(200).json(auditLogs);
  }
}
