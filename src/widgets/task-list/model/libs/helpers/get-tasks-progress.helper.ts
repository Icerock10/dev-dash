const TASK_PROGRESS_OFFSET = 100;

const getTasksProgress = (completedTasks: number, allTasks: number): string =>
    String((completedTasks / allTasks) * TASK_PROGRESS_OFFSET);

export { getTasksProgress };
