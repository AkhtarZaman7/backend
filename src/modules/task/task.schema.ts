import { z } from 'zod';

// Request Body Schemas
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    color: z.string().optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    color: z.string().optional(),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Task ID is required'),
  }),
});

export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Task ID is required'),
  }),
});

export const getTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Task ID is required'),
  }),
});

export const getTasksSchema = z.object({});

// Type definitions
export type CreateTaskBody = z.infer<typeof createTaskSchema>['body'];
export type UpdateTaskBody = z.infer<typeof updateTaskSchema>['body'];
export type TaskParams = z.infer<typeof getTaskSchema>['params'];