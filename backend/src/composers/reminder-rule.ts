import { ReminderRuleController } from '@/controllers/implementations';
import { IReminderRuleController } from '@/controllers/interfaces';
import { IReminderRuleRepository, ReminderRuleRepository } from '@/repositories';
import { IReminderRuleService, ReminderRuleService } from '@/services';

const reminderRuleRepository: IReminderRuleRepository = new ReminderRuleRepository();

const reminderRuleService: IReminderRuleService = new ReminderRuleService(reminderRuleRepository);
const reminderRuleController: IReminderRuleController = new ReminderRuleController(
  reminderRuleService,
);
