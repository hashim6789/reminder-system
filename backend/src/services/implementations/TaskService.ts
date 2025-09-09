import { ITaskRepository } from '@/repositories';
import { ITaskService } from '../interfaces';
import { ITask } from '@/types';

export class TaskService implements ITaskService {
  constructor(private _repository: ITaskRepository) {}

  async getAll(): Promise<ITask[]> {
    return this._repository.findAll();
  }
}
