import { PrismaClient } from '@prisma/client';
import { IAuditLogRepository } from '../interfaces';
import { CreateAuditLogDTO, IAuditLog } from '@/types';

const prisma = new PrismaClient();

export class AuditLogRepository implements IAuditLogRepository {
  async create(data: CreateAuditLogDTO): Promise<IAuditLog> {
    const log = await prisma.auditLog.create({
      data: {
        message: data.message,
        type: data.type,
      },
    });

    return log;
  }

  async findAll(): Promise<IAuditLog[]> {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return logs;
  }
}
