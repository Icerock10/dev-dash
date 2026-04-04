import { AppRoute } from '~/shared/libs/enums/enums';
import { SectionHeader } from '~/shared/ui/components/section-header';
import { type JobWithTasksDto } from '~/entities/task/index';
import { PipelineTaskItem } from './pipeline-task-item';
import {
    getFirstElements,
    getOverViewStats,
    findCompanyById,
} from '../../model/libs/helpers/helpers';

const MAX_TASKS_COUNT = 7;

type Properties = {
    jobs: JobWithTasksDto[];
};

const PipelineTasksList: React.FC<Properties> = ({ jobs }) => {
    const { totalIncompleteTasks } = getOverViewStats({ jobs });

    const upcomingTasks = getFirstElements(
        totalIncompleteTasks,
        MAX_TASKS_COUNT,
    );

    return (
        <div className="col-span-2 flex flex-col rounded-lg bg-[#161b27] p-5">
            <SectionHeader title="Upcoming tasks" href={AppRoute.TASKS} />
            <div className="flex flex-1 flex-col gap-0.5">
                {upcomingTasks.map((task) => {
                    const companyName = findCompanyById(jobs, task.jobId);
                    return (
                        <PipelineTaskItem
                            key={task.id}
                            task={task}
                            companyName={companyName}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { PipelineTasksList };
