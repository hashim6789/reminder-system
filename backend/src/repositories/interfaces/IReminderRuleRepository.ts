import { CreateReminderRuleDTO } from '@/schemas';
import { IReminderPopulatedDTO, IReminderRule } from '@/types';

export interface IReminderRuleRepository {
  create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO>;
  findAll(): Promise<IReminderPopulatedDTO[]>;
  findById(id: string): Promise<IReminderPopulatedDTO | null>;
  update(
    id: string,
    data: Partial<CreateReminderRuleDTO | Pick<IReminderRule, 'isActive'>>,
  ): Promise<IReminderPopulatedDTO | null>;
  delete(id: string): Promise<void>;
}
