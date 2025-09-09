import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AuditLogController } from '@/controllers/implementations';
import { IAuditLogController } from '@/controllers/interfaces';
import { IAuditLogRepository, AuditLogRepository } from '@/repositories';
import { IAuditLogService, AuditLogService } from '@/services';

const auditLogRepository: IAuditLogRepository = new AuditLogRepository();

const auditLogService: IAuditLogService = new AuditLogService(auditLogRepository);
const auditLogController: IAuditLogController = new AuditLogController(auditLogService);

/**
 * Router for handling auditLog-related routes.
 */
const auditLogRouter = Router();

auditLogRouter.get('/', asyncHandler(auditLogController.getAll.bind(auditLogController)));

export { auditLogRouter };
