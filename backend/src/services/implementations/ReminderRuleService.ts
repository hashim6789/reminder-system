import { IAuditLogRepository, IReminderRuleRepository, ITaskRepository } from '@/repositories';
import { IReminderRuleService } from '../interfaces';
import { CreateReminderRuleDTO, UpdateReminderRuleDTO } from '@/schemas';
import { IReminderPopulatedDTO } from '@/types';
import { AppError } from '@/middlewares';
import { HttpStatus, ReminderMessages } from '@/constants';

export class ReminderRuleService implements IReminderRuleService {
  constructor(
    private _repository: IReminderRuleRepository,
    private _auditLogRepository: IAuditLogRepository,
    private _taskRepository: ITaskRepository,
  ) {}

  async create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    const task = await this._taskRepository.findById(data.taskId);
    if (!task || !task.dueDate) {
      throw new AppError(ReminderMessages.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const now = new Date();
    const dueTime = new Date(task.dueDate);
    const reminderTime = new Date(dueTime.getTime() - data.minutesBefore * 60000);

    if (dueTime < now) {
      throw new AppError(ReminderMessages.TASK_DUE_PAST, HttpStatus.BAD_REQUEST);
    }

    if (reminderTime < now) {
      throw new AppError(ReminderMessages.REMINDER_TIME_PAST, HttpStatus.BAD_REQUEST);
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
      throw new AppError(ReminderMessages.RULE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const updatedRule = await this._repository.update(id, { isActive: change });
    if (!updatedRule) {
      throw new AppError(ReminderMessages.TOGGLE_FAILED, HttpStatus.INTERNAL_ERROR);
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
      throw new AppError(ReminderMessages.RULE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const task = await this._taskRepository.findById(data.taskId);
    if (!task || !task.dueDate) {
      throw new AppError(ReminderMessages.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const now = new Date();
    const dueTime = new Date(task.dueDate);
    const reminderTime = new Date(dueTime.getTime() - data.minutesBefore * 60000);

    if (dueTime < now) {
      throw new AppError(ReminderMessages.TASK_DUE_PAST, HttpStatus.BAD_REQUEST);
    }

    if (reminderTime < now) {
      throw new AppError(ReminderMessages.REMINDER_TIME_PAST, HttpStatus.BAD_REQUEST);
    }

    const updatedRule = await this._repository.update(id, data);
    if (!updatedRule) {
      throw new AppError(ReminderMessages.UPDATE_FAILED, HttpStatus.INTERNAL_ERROR);
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
      throw new AppError(ReminderMessages.RULE_NOT_FOUND, HttpStatus.NOT_FOUND);
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
