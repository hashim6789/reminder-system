import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ReminderRuleController } from '@/controllers/implementations';
import { IReminderRuleController } from '@/controllers/interfaces';
import {
  AuditLogRepository,
  IAuditLogRepository,
  IReminderRuleRepository,
  ITaskRepository,
  ReminderRuleRepository,
  TaskRepository,
} from '@/repositories';
import { IReminderRuleService, ReminderRuleService } from '@/services';
import { prisma } from '@/configs';

const reminderRuleRepository: IReminderRuleRepository = new ReminderRuleRepository(prisma);
const auditLogRepository: IAuditLogRepository = new AuditLogRepository(prisma);
const taskRepository: ITaskRepository = new TaskRepository(prisma);

const reminderRuleService: IReminderRuleService = new ReminderRuleService(
  reminderRuleRepository,
  auditLogRepository,
  taskRepository,
);
const reminderRuleController: IReminderRuleController = new ReminderRuleController(
  reminderRuleService,
);

/**
 * Router for handling reminderRule-related routes.
 */
const reminderRuleRouter = Router();

reminderRuleRouter.post(
  '/',
  asyncHandler(reminderRuleController.create.bind(reminderRuleController)),
);
reminderRuleRouter.get(
  '/',
  asyncHandler(reminderRuleController.getAll.bind(reminderRuleController)),
);
reminderRuleRouter.patch(
  '/:id',
  asyncHandler(reminderRuleController.toggleActive.bind(reminderRuleController)),
);
reminderRuleRouter.put(
  '/:id',
  asyncHandler(reminderRuleController.update.bind(reminderRuleController)),
);
reminderRuleRouter.delete(
  '/:id',
  asyncHandler(reminderRuleController.delete.bind(reminderRuleController)),
);

export { reminderRuleRouter };
