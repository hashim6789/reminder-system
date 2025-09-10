import { PrismaClient } from '@prisma/client';
import { IAuditLogRepository } from '../interfaces';
import { CreateAuditLogDTO, IAuditLog } from '@/types';

export class AuditLogRepository implements IAuditLogRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateAuditLogDTO): Promise<IAuditLog> {
    const log = await this.prisma.auditLog.create({
      data: {
        message: data.message,
        type: data.type,
      },
    });

    return log;
  }

  async findAll(): Promise<IAuditLog[]> {
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return logs;
  }
}
