import { SectionHeader } from '~/shared/ui/components/section-header';
import { PipelineStatusList } from './overview-pipeline/pipeline-status';
import { type JobWithTasksDto } from '~/entities/task/index';
import { getStatusFiltersWithCount } from '~/features/job/filter/model/libs/helpers/helpers';

type Properties = {
    jobs: JobWithTasksDto[];
};

const StatusBreakDown: React.FC<Properties> = ({ jobs }) => {
    const statusCounts = getStatusFiltersWithCount(jobs);
    return (
        <div className="rounded-lg bg-[#161b27] p-5">
            <SectionHeader title="Status breakdown" />
            <PipelineStatusList variant="brand" statusCounts={statusCounts} />
        </div>
    );
};

export { StatusBreakDown };
