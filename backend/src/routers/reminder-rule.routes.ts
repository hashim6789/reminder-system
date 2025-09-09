import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ReminderRuleController } from '@/controllers/implementations';
import { IReminderRuleController } from '@/controllers/interfaces';
import { IReminderRuleRepository, ReminderRuleRepository } from '@/repositories';
import { IReminderRuleService, ReminderRuleService } from '@/services';

const reminderRuleRepository: IReminderRuleRepository = new ReminderRuleRepository();

const reminderRuleService: IReminderRuleService = new ReminderRuleService(reminderRuleRepository);
const reminderRuleController: IReminderRuleController = new ReminderRuleController(
  reminderRuleService,
);

/**
 * Router for handling auth-related routes.
 */
const reminderRuleRouter = Router();

reminderRuleRouter.post(
  '/',
  asyncHandler(reminderRuleController.create.bind(reminderRuleController)),
);
reminderRuleRouter.get(
  '/',
  asyncHandler(reminderRuleController.create.bind(reminderRuleController)),
);

export { reminderRuleRouter };
