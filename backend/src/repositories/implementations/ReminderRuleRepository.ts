import { PrismaClient } from '@prisma/client';
import { IReminderPopulatedDTO, IReminderRule, ITask } from '@/types';
import { IReminderRuleRepository } from '../interfaces';
import { CreateReminderRuleDTO } from '@/schemas';

const prisma = new PrismaClient();

export class ReminderRuleRepository implements IReminderRuleRepository {
  async create(data: CreateReminderRuleDTO): Promise<IReminderPopulatedDTO> {
    const rule = await prisma.reminderRule.create({
      data: {
        taskId: data.taskId,
        minutesBefore: data.minutesBefore,
        title: data.title,
      },
      include: { task: true },
    });

    return this.toIReminderRule(rule);
  }

  async findAll(): Promise<IReminderPopulatedDTO[]> {
    const rules = await prisma.reminderRule.findMany({ include: { task: true } });
    return rules.map(this.toIReminderRule);
  }

  async findById(id: string): Promise<IReminderPopulatedDTO | null> {
    const rule = await prisma.reminderRule.findUnique({ where: { id }, include: { task: true } });

    if (!rule) return null;

    return this.toIReminderRule(rule);
  }

  async update(
    id: string,
    data: Partial<CreateReminderRuleDTO | Pick<IReminderRule, 'isActive'>>,
  ): Promise<IReminderPopulatedDTO | null> {
    const updatedRule = await prisma.reminderRule.update({
      where: { id },
      data,
      include: { task: true },
    });

    if (!updatedRule) return null;

    return this.toIReminderRule(updatedRule);
  }

  async delete(id: string): Promise<void> {
    await prisma.reminderRule.delete({
      where: { id },
    });
  }

  private toIReminderRule(rule: IReminderRule & { task: ITask }): IReminderPopulatedDTO {
    return {
      id: rule.id,
      minutesBefore: rule.minutesBefore,
      isActive: rule.isActive,
      title: rule.title,
      createdAt: rule.createdAt,
      task: {
        id: rule.task.id,
        title: rule.task.title,
        dueDate: rule.task.dueDate,
      },
    };
  }
}
