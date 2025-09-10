import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { TaskController } from '@/controllers/implementations';
import { ITaskController } from '@/controllers/interfaces';
import { ITaskRepository, TaskRepository } from '@/repositories';
import { ITaskService, TaskService } from '@/services';
import { prisma } from '@/configs';

const taskRepository: ITaskRepository = new TaskRepository(prisma);

const taskService: ITaskService = new TaskService(taskRepository);
const taskController: ITaskController = new TaskController(taskService);

/**
 * Router for handling task-related routes.
 */
const taskRouter = Router();

taskRouter.get('/', asyncHandler(taskController.getAll.bind(taskController)));

export { taskRouter };
