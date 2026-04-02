'use client';

import { Header, TaskList } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { PlusIcon } from '~/shared/ui/icons/icons';
import { TasksFilter } from '~/features/tasks/filter/ui/tasks-filter';

const TasksPage: React.FC = () => {
    return (
        <div className="flex-1">
            <Header
                title="Tasks"
                subTitle="Manage your job search action items"
            >
                <Button icon={<PlusIcon />} label="Add Task" />
            </Header>
            <TasksFilter />
            <TaskList />
        </div>
    );
};

export { TasksPage };
