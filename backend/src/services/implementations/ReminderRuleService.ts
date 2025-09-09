import { IAuditLogRepository, IReminderRuleRepository } from '@/repositories';
import { IReminderRuleService } from '../interfaces';
import { CreateReminderRuleDTO, UpdateReminderRuleDTO } from '@/schemas';
import { IReminderPopulatedDTO } from '@/types';

export class ReminderRuleService implements IReminderRuleService {
  constructor(
    private _repository: IReminderRuleRepository,
    private _auditLogRepository: IAuditLogRepository,
  ) {}

  async create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    const createdRule = await this._repository.create(data);

    const message = `Create: reminder rule "${createdRule.title}" created for task "${createdRule.task.title}" (due at ${createdRule.task.dueDate.toLocaleString()})`;
    console.log(`[Create] ${message}`);

    await this._auditLogRepository.create({
      message,
      type: 'create',
    });

    return createdRule;
  }

  async getAll(): Promise<IReminderPopulatedDTO[]> {
    return await this._repository.findAll(); // No audit log here as requested
  }

  async toggleActive(id: string, change: boolean): Promise<IReminderPopulatedDTO> {
    const existingRule = await this._repository.findById(id);
    if (!existingRule) {
      throw new Error('Reminder rule does not exist.');
    }

    const updatedRule = await this._repository.update(id, { isActive: change });
    if (!updatedRule) {
      throw new Error('Failed to toggle reminder rule status.');
    }

    const status = change ? 'activated' : 'deactivated';
    const message = `Toggle: ${status} reminder for task "${updatedRule.task.title}" (due at ${updatedRule.task.dueDate.toLocaleString()})`;

    console.log(`[Toggle] ${message}`);

    await this._auditLogRepository.create({
      message,
      type: 'toggle',
    });

    return updatedRule;
  }

  async update(id: string, data: UpdateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    const existingRule = await this._repository.findById(id);
    if (!existingRule) {
      throw new Error('Reminder rule does not exist.');
    }

    const updatedRule = await this._repository.update(id, data);
    if (!updatedRule) {
      throw new Error('Failed to update reminder rule.');
    }

    const message = `Update: reminder rule "${updatedRule.title}" updated for task "${updatedRule.task.title}" (due at ${updatedRule.task.dueDate.toLocaleString()})`;

    console.log(`[Update] ${message}`);

    await this._auditLogRepository.create({
      message,
      type: 'update',
    });

    return updatedRule;
  }

  async delete(id: string): Promise<void> {
    const existingRule = await this._repository.findById(id);
    if (!existingRule) {
      throw new Error('Reminder rule does not exist.');
    }

    await this._repository.delete(id);

    const message = `Delete: reminder rule "${existingRule.title}" removed from task "${existingRule.task.title}" (due at ${existingRule.task.dueDate.toLocaleString()})`;
    console.log(`[Delete] ${message}`);

    await this._auditLogRepository.create({
      message,
      type: 'delete',
    });
  }
}
