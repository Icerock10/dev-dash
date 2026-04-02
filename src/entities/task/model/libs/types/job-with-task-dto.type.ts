import { type JobDto } from '~/entities/job/index';
import { type TaskDto } from './types';

type JobWithTasksDto = JobDto & {
    tasks: TaskDto[];
};

export { type JobWithTasksDto };
