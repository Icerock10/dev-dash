'use client';

import { type JobWithTasksDto } from '~/entities/task/index';
import { useMemo } from '~/shared/hooks/hooks';
import { TaskListGroup } from './task-list-group';
import { TaskItem } from './task-item';
import { getCompletedTasksCount } from '../model/libs/helpers/helpers';

const MIN_TASKS_LENGTH = 0;

type Properties = {
    jobWithTasks: JobWithTasksDto[];
};

const TaskList: React.FC<Properties> = ({ jobWithTasks }) => {
    const filteredJobs = useMemo(
        () => jobWithTasks.filter((job) => job.tasks.length > MIN_TASKS_LENGTH),
        [jobWithTasks],
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
                        />
                        {job.tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export { TaskList };
