import { PrismaClient } from '@prisma/client';
import { IReminderRule } from '@/types';
import { IReminderRuleRepository } from '../interfaces';
import { CreateReminderRuleDTO } from '@/schemas';

const prisma = new PrismaClient();

export class ReminderRuleRepository implements IReminderRuleRepository {
  async create(data: CreateReminderRuleDTO): Promise<IReminderRule> {
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

  private toIReminderRule(rule: IReminderRule & { task?: any }): IReminderRule {
    return {
      id: rule.id,
      minutesBefore: rule.minutesBefore,
      isActive: rule.isActive,
      taskId: rule.taskId,
      title: rule.title,
      createdAt: rule.createdAt,
      task: rule.task
        ? {
            id: rule.task.id,
            title: rule.task.title,
            dueDate: rule.task.dueDate,
          }
        : undefined,
    };
  }
}
