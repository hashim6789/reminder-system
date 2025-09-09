import { CreateAuditLogDTO, IAuditLog } from '@/types';
import { IAuditLogService } from '../interfaces';
import { IAuditLogRepository } from '@/repositories';

export class AuditLogService implements IAuditLogService {
  constructor(private _repository: IAuditLogRepository) {}

  async create(data: CreateAuditLogDTO): Promise<IAuditLog> {
    return this._repository.create(data);
  }

  async findAll(): Promise<IAuditLog[]> {
    return this._repository.findAll();
  }
}
