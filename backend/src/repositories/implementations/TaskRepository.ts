import { PrismaClient } from '@prisma/client';
import { ITaskRepository } from '../interfaces';
import { ITask } from '@/types';

export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<ITask[]> {
    return await this.prisma.task.findMany();
  }
}
