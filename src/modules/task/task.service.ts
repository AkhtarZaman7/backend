import prisma from '@lib/prisma';
import { CreateTaskDTO, UpdateTaskDTO } from './task.types';

export class TaskService {
  async getAllTasks(deviceId: string) {
    return prisma.task.findMany({
      where: { deviceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTaskById(id: string, deviceId: string) {
    return prisma.task.findFirst({
      where: { id, deviceId },
    });
  }

  async createTask(data: CreateTaskDTO) {
    return prisma.task.create({
      data: {
        title: data.title,
        color: data.color,
        deviceId: data.deviceId,
      },
    });
  }

  async updateTask(id: string, deviceId: string, data: UpdateTaskDTO) {
    await prisma.task.updateMany({
      where: { id, deviceId },
      data,
    });
    return this.getTaskById(id, deviceId);
  }

  async deleteTask(id: string, deviceId: string) {
    return prisma.task.deleteMany({
      where: { id, deviceId },
    });
  }
}

export const taskService = new TaskService(); 