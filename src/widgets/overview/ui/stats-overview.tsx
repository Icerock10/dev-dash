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
        totalIncompleteTasksCount,
        totalTasksCount,
        completedTasksCount,
        responseRate,
        responseCount,
        appliedCount,
    } = getOverViewStats({ jobs });

    return (
        <div className="grid grid-cols-4 gap-3">
            <div className="rounded-lg border border-white/5 bg-[#161b27] px-5 py-4.5">
                <h1 className="mb-3 text-[10px] tracking-wide text-slate-500 uppercase">
                    Total jobs
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-white">
                    {totalJobsCount}
                </p>
                <p className="text-[11px] text-slate-600">tracked listings</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-[#161b27] p-6">
                <h1 className="mb-3 text-[10px] tracking-wide uppercase">
                    In Progress
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-emerald-400">
                    {jobsInProgressCount}
                </p>
                <p className="text-[11px] text-slate-600">
                    applied + interview
                </p>
            </div>
            <div className="rounded-lg border border-white/5 bg-[#161b27] p-6">
                <h1 className="mb-3 text-[10px] tracking-wide uppercase">
                    Tasks Pending
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-blue-400">
                    {totalIncompleteTasksCount}
                </p>
                <TaskProgressBar
                    completedTasksCount={completedTasksCount}
                    allTasksCount={totalTasksCount}
                />
            </div>

            <div className="rounded-lg border border-white/5 bg-[#161b27] p-6">
                <h1 className="mb-3 text-[10px] tracking-wide text-slate-500 uppercase">
                    Response Rate
                </h1>
                <p className="mb-1 font-mono text-3xl font-semibold text-purple-400">
                    {responseRate}%
                </p>
                <p className="text-[11px] text-slate-600">
                    {responseCount} of {appliedCount} applications
                </p>
            </div>
        </div>
    );
};

export { StatsOverview };
