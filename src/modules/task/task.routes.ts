import { Router } from 'express';
import { taskController } from '@modules/task/task.controller';
import { validateRequest } from '@middleware/validate-request';
import { validateDeviceId } from '@middleware/deviceId';
import { createTaskSchema, updateTaskSchema, deleteTaskSchema, getTaskSchema, getTasksSchema } from '@modules/task/task.schema';

const router = Router();

// Apply device ID validation to all routes in this router
router.use(validateDeviceId);

router.get('/', validateRequest(getTasksSchema), taskController.getTasks);
router.post('/', validateRequest(createTaskSchema), taskController.createTask);
router.get('/:id', validateRequest(getTaskSchema), taskController.getTask); 
router.put('/:id', validateRequest(updateTaskSchema), taskController.updateTask);
router.delete('/:id', validateRequest(deleteTaskSchema), taskController.deleteTask);

export default router; 