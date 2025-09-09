import { IAuditLog } from '@/types';

export interface IAuditLogService {
  create(data: CreateAuditLogDTO): Promise<IAuditLog>;
  findAll(): Promise<IAuditLog[]>;
}
