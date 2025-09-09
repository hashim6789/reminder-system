import { CreateReminderRuleDTO } from '@/schemas';
import { IReminderRule } from '@/types';

export interface IReminderRuleService {
  create(data: CreateReminderRuleDTO): Promise<IReminderRule>;
}
