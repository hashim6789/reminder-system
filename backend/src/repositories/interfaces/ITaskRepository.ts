import { ITask } from '@/types';

export interface ITaskRepository {
  findAll(): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
}
