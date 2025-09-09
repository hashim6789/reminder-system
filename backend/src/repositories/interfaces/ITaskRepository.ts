import { ITask } from '@/types';

export interface ITaskRepository {
  findAll(): Promise<ITask[]>;
}
