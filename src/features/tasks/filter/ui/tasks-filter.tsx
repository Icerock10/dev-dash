import { type JobWithTasksDto } from '~/entities/task/index';
import { FilterTabs } from '~/shared/ui/components/filter-tabs';
import { TaskFilter, TaskFilterTabs, useTaskFilter } from '../model/index';
import { JobSelectItem } from './job-select-item';

type Properties = {
    allJobsWithTasks: JobWithTasksDto[];
};

const TasksFilter: React.FC<Properties> = ({ allJobsWithTasks }) => {
    const {
        setFilter,
        searchParams,
        completedTasks,
        tasksProgress,
        tasksLength,
        jobsWithActiveTasks,
        selectedJobId,
    } = useTaskFilter({ allJobsWithTasks });

    return (
        <div className="flex items-center gap-6 border-b border-white/6 px-6 py-3">
            <div className="flex flex-1 items-center gap-3">
                <div className="max-w-xs flex-1">
                    <div className="mb-1.5 flex justify-between">
                        <span className="font-mono text-[11px] text-slate-500">
                            Progress
                        </span>
                        <span
                            className="font-mono text-[11px] text-slate-400"
                            id="progress-label"
                        >
                            {completedTasks} / {tasksLength}
                        </span>
                    </div>
                    <div className="h-1 flex-1 rounded-md bg-[#1e2a45]">
                        <div
                            className="h-full rounded-md bg-[#2563eb] transition-[width] duration-300"
                            style={{ width: `${tasksProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <FilterTabs
                tabs={TaskFilterTabs}
                onChange={(value) => {
                    setFilter(TaskFilter.COMPLETED, value);
                }}
                activeValue={searchParams.get(TaskFilter.COMPLETED)}
            />
            <JobSelectItem
                selectedJobId={selectedJobId}
                setFilter={setFilter}
                jobsWithActiveTasks={jobsWithActiveTasks}
            />
        </div>
    );
};

export { TasksFilter };
