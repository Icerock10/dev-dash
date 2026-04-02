import { type JobWithTasksDto } from '~/entities/task/index';
import { Button } from '~/shared/ui/components/components';
import { PlusIcon } from '~/shared/ui/icons/icons';
import { getClassNames, normalizeStatus } from '~/shared/libs/helpers/helpers';
import { JOB_STATUS_COLORS, CompanyLogo } from '~/entities/job/index';
import { getTasksProgress } from '../model/libs/helpers/helpers';

type Properties = {
    jobCompany: JobWithTasksDto['company'];
    jobTitle: JobWithTasksDto['title'];
    jobTasks: JobWithTasksDto['tasks'];
    jobStatus: JobWithTasksDto['status'];
    completedTasks: number;
};

const TaskListGroup: React.FC<Properties> = ({
    jobCompany,
    jobTitle,
    jobTasks,
    jobStatus,
    completedTasks,
}) => {
    const jobStatusColor = JOB_STATUS_COLORS[jobStatus];
    const taskProgressPercent = getTasksProgress(
        completedTasks,
        jobTasks.length,
    );

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
                <div className="mt-0.5 flex items-center gap-2">
                    <div className="h-0.5 max-w-20 flex-1 bg-[#1e2a45]">
                        <div
                            className="h-full bg-[#2563eb]"
                            style={{ width: `${taskProgressPercent}%` }}
                        ></div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-600">
                        {completedTasks}/{jobTasks.length}
                    </span>
                </div>
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
                icon={<PlusIcon className="h-3.5 w-3.5" />}
            />
        </div>
    );
};

export { TaskListGroup };
