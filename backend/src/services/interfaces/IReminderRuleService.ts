import { CreateReminderRuleDTO } from '@/schemas';
import { IReminderPopulatedDTO } from '@/types';

export interface IReminderRuleService {
  create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO>;
  getAll(): Promise<IReminderPopulatedDTO[]>;
  toggleActive(id: string, change: boolean): Promise<IReminderPopulatedDTO>;
}
