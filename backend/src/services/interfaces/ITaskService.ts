import { ITask } from '@/types';

export interface ITaskService {
  getAll(): Promise<ITask[]>;
}
