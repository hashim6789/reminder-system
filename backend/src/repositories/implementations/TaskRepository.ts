import { PrismaClient } from '@prisma/client';
import { ITaskRepository } from '../interfaces';
import { ITask } from '@/types';

const prisma = new PrismaClient();

export class TaskRepository implements ITaskRepository {
  async findAll(): Promise<ITask[]> {
    return await prisma.task.findMany();
  }
}
