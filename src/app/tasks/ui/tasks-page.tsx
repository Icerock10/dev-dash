'use client';

import { Header, TaskList } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { PlusIcon } from '~/shared/ui/icons/icons';
import { TasksFilter } from '~/features/tasks/filter/ui/tasks-filter';
import { type JobWithTasksDto } from '~/entities/task/index';
import { useMemo } from '~/shared/hooks/hooks';
import { TaskForm } from '~/features/tasks/manage/task-form';
import { getUniqueCompanyOptions } from '../model/libs/helpers/helpers';
import { useTaskModal } from '../model/use-task-modal';

type Properties = {
    jobsWithTasks: JobWithTasksDto[];
    allJobsWithTasks: JobWithTasksDto[];
};

const TasksPage: React.FC<Properties> = ({
    jobsWithTasks,
    allJobsWithTasks,
}) => {
    const {
        editingTask,
        isFormOpen,
        closeTaskForm,
        openCreateTaskForm,
        openEditTaskForm,
    } = useTaskModal();

    const uniqueCompanyOptions = useMemo(
        () => getUniqueCompanyOptions(allJobsWithTasks),
        [allJobsWithTasks],
    );

    return (
        <div className="flex-1 font-sans">
            <TaskForm
                isOpen={isFormOpen}
                onTaskFormClose={closeTaskForm}
                uniqueJobs={uniqueCompanyOptions}
                task={editingTask ?? null}
            />
            <Header
                title="Tasks"
                subTitle="Manage your job search action items"
            >
                <Button
                    onClick={openCreateTaskForm}
                    icon={<PlusIcon className="h-3 w-3" />}
                    label="Add Task"
                />
            </Header>
            <TasksFilter allJobsWithTasks={allJobsWithTasks} />
            <TaskList
                jobsWithTasks={jobsWithTasks}
                onEditTask={openEditTaskForm}
                onCreateTask={openCreateTaskForm}
            />
        </div>
    );
};

export { TasksPage };
