import { IAuditLogRepository, IReminderRuleRepository, ITaskRepository } from '@/repositories';
import { IReminderRuleService } from '../interfaces';
import { CreateReminderRuleDTO, UpdateReminderRuleDTO } from '@/schemas';
import { IReminderPopulatedDTO } from '@/types';
import { AppError } from '@/middlewares';

export class ReminderRuleService implements IReminderRuleService {
  constructor(
    private _repository: IReminderRuleRepository,
    private _auditLogRepository: IAuditLogRepository,
    private _taskRepository: ITaskRepository,
  ) {}

  async create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    const task = await this._taskRepository.findById(data.taskId);
    if (!task || !task.dueDate) {
      throw new AppError('Invalid task or missing due date.', 404);
    }

    const now = new Date();
    const dueTime = new Date(task.dueDate);
    const reminderTime = new Date(dueTime.getTime() - data.minutesBefore * 60000);

    if (dueTime < now) {
      throw new AppError('Cannot create reminder: task due time is in the past.', 400);
    }

    if (reminderTime < now) {
      throw new AppError('Cannot create reminder: reminder time is already in the past.', 400);
    }

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
    return await this._repository.findAll();
  }

  async toggleActive(id: string, change: boolean): Promise<IReminderPopulatedDTO> {
    const existingRule = await this._repository.findById(id);
    if (!existingRule) {
      throw new AppError('Reminder rule does not exist.', 404);
    }

    const updatedRule = await this._repository.update(id, { isActive: change });
    if (!updatedRule) {
      throw new AppError('Failed to toggle reminder rule status.', 500);
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
      throw new AppError('Reminder rule does not exist.', 404);
    }

    const task = await this._taskRepository.findById(data.taskId);
    if (!task || !task.dueDate) {
      throw new AppError('Invalid task or missing due date.', 404);
    }

    const now = new Date();
    const dueTime = new Date(task.dueDate);
    const reminderTime = new Date(dueTime.getTime() - data.minutesBefore * 60000);

    if (dueTime < now) {
      throw new AppError('Cannot update reminder: task due time is in the past.', 400);
    }

    if (reminderTime < now) {
      throw new AppError('Cannot update reminder: reminder time is already in the past.', 400);
    }

    const updatedRule = await this._repository.update(id, data);
    if (!updatedRule) {
      throw new AppError('Failed to update reminder rule.', 500);
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
      throw new AppError('Reminder rule does not exist.', 404);
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
