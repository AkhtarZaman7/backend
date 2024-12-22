import { Request, Response } from 'express';
import { taskService } from './task.service';
import { createTaskSchema, updateTaskSchema, CreateTaskBody, UpdateTaskBody } from './task.schema';
import { ApiError } from '@lib/errors';
import { catchAsync } from '@lib/catchAsync';

export class TaskController {
  getTasks = catchAsync('get-tasks', async (req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks(req.deviceId!);
    return res.json(tasks);
  });

  createTask = catchAsync('create-task', async (req: Request, res: Response) => {
    const { body } = createTaskSchema.parse({ body: req.body });
    const task = await taskService.createTask({
      ...body,
      deviceId: req.deviceId!
    });
    return res.status(201).json(task);
  });

  getTask = catchAsync('get-task', async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(id, req.deviceId!);
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }
    return res.json(task);
  });

  updateTask = catchAsync('update-task', async (req: Request, res: Response) => {
    const { body, params } = updateTaskSchema.parse({
      body: req.body,
      params: req.params,
    });

    const task = await taskService.getTaskById(params.id, req.deviceId!);
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    const result = await taskService.updateTask(params.id, req.deviceId!, body);
    return res.json(result);
  });

  deleteTask = catchAsync('delete-task', async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(id, req.deviceId!);
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    await taskService.deleteTask(id, req.deviceId!);
    return res.json({ message: 'Task deleted successfully' });
  });
}

export const taskController = new TaskController(); 