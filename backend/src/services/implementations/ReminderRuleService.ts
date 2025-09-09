import { IReminderRuleRepository } from '@/repositories';
import { IReminderRuleService } from '../interfaces';
import { CreateReminderRuleDTO, UpdateReminderRuleDTO } from '@/schemas';
import { IReminderPopulatedDTO } from '@/types';

export class ReminderRuleService implements IReminderRuleService {
  constructor(private _repository: IReminderRuleRepository) {}

  async create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    return this._repository.create(data);
  }

  async getAll(): Promise<IReminderPopulatedDTO[]> {
    return await this._repository.findAll();
  }

  async toggleActive(id: string, change: boolean): Promise<IReminderPopulatedDTO> {
    const existingRule = await this._repository.findById(id);
    if (!existingRule) {
      throw new Error('The rule is not exist!');
    }

    const updatedRule = await this._repository.update(id, { isActive: change });

    if (!updatedRule) {
      throw new Error('The rule toggle active is failed!');
    }

    return updatedRule;
  }

  async update(id: string, data: UpdateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    const existingRule = await this._repository.findById(id);
    if (!existingRule) {
      throw new Error('The rule is not exist!');
    }

    const updatedRule = await this._repository.update(id, data);

    if (!updatedRule) {
      throw new Error('The rule toggle active is failed!');
    }

    return updatedRule;
  }

  async delete(id: string): Promise<void> {
    return this._repository.delete(id);
  }
}
