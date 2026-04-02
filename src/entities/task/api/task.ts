import { TaskRepository } from './task.repository';
import { prisma } from '~/shared/libs/modules/prisma/prisma';
import { jobService } from '~/entities/job/api/job';
import { TaskService } from './task.service';

const taskRepository = new TaskRepository({ database: prisma });
const taskService = new TaskService({ taskRepository, jobService });

export { taskService };
