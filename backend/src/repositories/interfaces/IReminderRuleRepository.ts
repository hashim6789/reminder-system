import { CreateReminderRuleDTO } from '@/schemas';
import { IReminderRule } from '@/types';

export interface IReminderRuleRepository {
  create(data: CreateReminderRuleDTO): Promise<IReminderRule>;
}
