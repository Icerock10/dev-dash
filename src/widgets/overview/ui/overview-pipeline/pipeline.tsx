import Link from 'next/link';
import { AppRoute } from '~/shared/libs/enums/enums';
import { type JobWithTasksDto } from '~/entities/task/index';
import { getStatusFiltersWithCount } from '~/features/job/filter/model/libs/helpers/helpers';
import { PipelineBar } from './pipeline-bar';
import { PipelineStatusList } from './pipeline-status';
import { PipeLineJobList } from './pipeline-job-list';

type Properties = {
    jobs: JobWithTasksDto[];
};

const Pipeline: React.FC<Properties> = ({ jobs }) => {
    const statusCounts = getStatusFiltersWithCount(jobs);
    const totalJobsCount = jobs.length;

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 rounded-lg border border-white/4 bg-[#161b27] p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-[13px] font-medium text-white">
                        Pipeline
                    </h1>
                    <Link
                        className="text-[11px] text-slate-500 transition-colors hover:text-slate-300"
                        href={AppRoute.JOBS}
                    >
                        View all →
                    </Link>
                </div>
                <PipelineBar
                    statusCounts={statusCounts}
                    totalJobsCount={totalJobsCount}
                />
                <PipelineStatusList statusCounts={statusCounts} />
                <h1 className="mb-2 text-[10px] tracking-wide text-slate-600 uppercase">
                    Recent listings
                </h1>
                <PipeLineJobList jobs={jobs} />
            </div>
        </div>
    );
};

export { Pipeline };
