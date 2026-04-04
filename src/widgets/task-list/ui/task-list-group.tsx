import { type JobWithTasksDto } from '~/entities/task/index';
import { Button } from '~/shared/ui/components/components';
import { PlusIcon } from '~/shared/ui/icons/icons';
import { getClassNames, normalizeStatus } from '~/shared/libs/helpers/helpers';
import { JOB_STATUS_COLORS, CompanyLogo } from '~/entities/job/index';
import { TaskProgressBar } from '~/shared/ui/components/task-progress-bar';

type Properties = {
    jobCompany: JobWithTasksDto['company'];
    jobTitle: JobWithTasksDto['title'];
    jobTasks: JobWithTasksDto['tasks'];
    jobStatus: JobWithTasksDto['status'];
    completedTasks: number;
    onCreateTask: () => void;
};

const TaskListGroup: React.FC<Properties> = ({
    jobCompany,
    jobTitle,
    jobTasks,
    jobStatus,
    completedTasks,
    onCreateTask,
}) => {
    const jobStatusColor = JOB_STATUS_COLORS[jobStatus];

    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <CompanyLogo jobCompanyName={jobCompany} />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{jobCompany}</span>
                    <span className="truncate text-[11px] text-slate-500">
                        · {jobTitle}
                    </span>
                </div>
                <TaskProgressBar
                    completedTasksCount={completedTasks}
                    allTasksCount={jobTasks.length}
                />
            </div>
            <span
                className={getClassNames(
                    'rounded-md border px-2 py-0.5 font-mono text-[10px]',
                    jobStatusColor.color,
                    `border-${jobStatusColor.bg}`,
                )}
            >
                {normalizeStatus(jobStatus)}
            </span>
            <Button
                className="h-6 w-6 shrink-0 rounded-md text-slate-600 transition-colors hover:bg-white/6 hover:text-slate-300"
                label=""
                isIconOnly
                onClick={onCreateTask}
                icon={<PlusIcon className="h-3.5 w-3.5" />}
            />
        </div>
    );
};

export { TaskListGroup };
