import { type JobWithTasksDto } from '~/entities/task/index';
import { getOverViewStats } from '../model/libs/helpers/get-overview-stats';
import { TaskProgressBar } from '~/shared/ui/components/task-progress-bar';

type Properties = {
    jobs: JobWithTasksDto[];
};

const StatsOverview: React.FC<Properties> = ({ jobs }) => {
    const {
        totalJobsCount,
        jobsInProgressCount,
        totalIncompleteTasks,
        totalTasksCount,
        completedTasksCount,
        responseRate,
        responseCount,
        appliedCount,
    } = getOverViewStats({ jobs });

    return (
        <div className="grid-cols-auto grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-white/5 bg-[#161b27] px-5 py-4.5 text-xs">
                <h1 className="mb-3 text-[10px] tracking-wide text-slate-500 uppercase">
                    Total jobs
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-white">
                    {totalJobsCount}
                </p>
                <p className="text-slate-600">tracked listings</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-[#161b27] px-5 py-4.5 text-xs">
                <h1 className="mb-3 text-[10px] tracking-wide text-slate-500 uppercase">
                    In Progress
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-emerald-400">
                    {jobsInProgressCount}
                </p>
                <p className="text-slate-600">applied + interview</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-[#161b27] px-5 py-4.5">
                <h1 className="mb-3 text-[10px] tracking-wide text-slate-500 uppercase">
                    Tasks Pending
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-blue-400">
                    {totalIncompleteTasks.length}
                </p>
                <TaskProgressBar
                    completedTasksCount={completedTasksCount}
                    allTasksCount={totalTasksCount}
                />
            </div>

            <div className="rounded-lg border border-white/5 bg-[#161b27] px-5 py-4.5 text-xs">
                <h1 className="mb-3 text-[10px] tracking-wide text-slate-500 uppercase">
                    Response Rate
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-purple-400">
                    {responseRate}%
                </p>
                <p className="text-slate-600">
                    {responseCount} of {appliedCount} applications
                </p>
            </div>
        </div>
    );
};

export { StatsOverview };
