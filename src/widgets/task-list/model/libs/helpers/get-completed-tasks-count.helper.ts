import { type JobWithTasksDto } from '~/entities/task/index';

const getCompletedTasksCount = (jobTasks: JobWithTasksDto['tasks']): number =>
    jobTasks.filter((task) => task.completed).length;

export { getCompletedTasksCount };
