import { CreateAuditLogDTO, IAuditLog } from '@/types';

export interface IAuditLogRepository {
  create(data: CreateAuditLogDTO): Promise<IAuditLog>;
  findAll(): Promise<IAuditLog[]>;
}
