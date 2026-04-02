'use client';

import { Header, TaskList } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { PlusIcon } from '~/shared/ui/icons/icons';
import { TasksFilter } from '~/features/tasks/filter/ui/tasks-filter';
import { type JobWithTasksDto } from '~/entities/task/index';

type Properties = {
    jobsWithTasks: JobWithTasksDto[];
    allJobsWithTasks: JobWithTasksDto[];
};

const TasksPage: React.FC<Properties> = ({
    jobsWithTasks,
    allJobsWithTasks,
}) => {
    return (
        <div className="flex-1 font-sans">
            <Header
                title="Tasks"
                subTitle="Manage your job search action items"
            >
                <Button icon={<PlusIcon />} label="Add Task" />
            </Header>
            <TasksFilter allJobsWithTasks={allJobsWithTasks} />
            <TaskList jobsWithTasks={jobsWithTasks} />
        </div>
    );
};

export { TasksPage };
