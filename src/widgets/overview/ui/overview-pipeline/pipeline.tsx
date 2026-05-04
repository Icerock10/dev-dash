import { AppRoute } from '~/shared/libs/enums/enums';
import { type JobWithTasksDto } from '~/entities/task/index';
import { getStatusFiltersWithCount } from '~/features/job/filter/model/libs/helpers/helpers';
import { PipelineBar } from './pipeline-bar';
import { PipelineStatusList } from './pipeline-status';
import { PipeLineJobList } from './pipeline-job-list';
import { SectionHeader } from '~/shared/ui/components/section-header';
import { PipelineTasksList } from './pipeline-tasks-list';

type Properties = {
    jobs: JobWithTasksDto[];
};

const Pipeline: React.FC<Properties> = ({ jobs }) => {
    const statusCounts = getStatusFiltersWithCount(jobs);
    const totalJobsCount = jobs.length;

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="col-span-3 rounded-lg border border-white/4 bg-[#161b27] p-5">
                <SectionHeader title="Pipeline" href={AppRoute.JOBS} />
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
            <PipelineTasksList jobs={jobs} />
        </div>
    );
};

export { Pipeline };
