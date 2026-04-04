'use client';

import { type JobWithTasksDto, type TaskDto } from '~/entities/task/index';
import { useMemo } from '~/shared/hooks/hooks';
import { TaskListGroup } from './task-list-group';
import { TaskItem } from './task-item';
import { getCompletedTasksCount } from '../model/libs/helpers/helpers';

const MIN_TASKS_LENGTH = 0;

type Properties = {
    jobsWithTasks: JobWithTasksDto[];
    onEditTask: (task: TaskDto | null) => void;
    onCreateTask: () => void;
};

const TaskList: React.FC<Properties> = ({
    jobsWithTasks,
    onEditTask,
    onCreateTask,
}) => {
    const filteredJobs = useMemo(
        () =>
            jobsWithTasks.filter((job) => job.tasks.length > MIN_TASKS_LENGTH),
        [jobsWithTasks],
    );

    return (
        <div className="flex flex-col gap-6 p-6">
            {filteredJobs.map((job) => {
                const completedTasks = getCompletedTasksCount(job.tasks);
                return (
                    <div
                        key={job.id}
                        className="overflow-hidden rounded-xl border border-white/6 bg-[#161b27]"
                    >
                        <TaskListGroup
                            jobTasks={job.tasks}
                            jobTitle={job.title}
                            jobCompany={job.company}
                            jobStatus={job.status}
                            completedTasks={completedTasks}
                            onCreateTask={onCreateTask}
                        />
                        {job.tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEditTask={onEditTask}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export { TaskList };
