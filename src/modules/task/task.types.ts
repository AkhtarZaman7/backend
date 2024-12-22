export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDTO {
  title: string;
  color?: string;
  deviceId: string;
}

export interface UpdateTaskDTO {
  title?: string;
  color?: string;
  completed?: boolean;
} 