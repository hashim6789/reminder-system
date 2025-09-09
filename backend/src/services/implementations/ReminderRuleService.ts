import { IReminderRuleRepository } from '@/repositories';
import { IReminderRuleService } from '../interfaces';
import { CreateReminderRuleDTO } from '@/schemas';
import { IReminderRule } from '@/types';

export class ReminderRuleService implements IReminderRuleService {
  constructor(private _repository: IReminderRuleRepository) {}

  async create(data: CreateReminderRuleDTO): Promise<IReminderRule> {
    console.log(data);
    return this._repository.create(data);
  }
}
