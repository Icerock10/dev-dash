import { type JobWithTasksDto } from '../../task/index';
import { PipelineStatusList } from '~/widgets/overview/ui/overview-pipeline/pipeline-status';
import { getStatusFiltersWithCount } from '~/features/job/filter/model/libs/helpers/helpers';

type Properties = {
    jobs: JobWithTasksDto[];
};

const ActivityOverview: React.FC<Properties> = ({ jobs }) => {
    const statusCounts = getStatusFiltersWithCount(jobs);
    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <h2 className="mb-4 text-sm font-medium">Activity overview</h2>
            <PipelineStatusList
                statusCounts={statusCounts}
                variant="brand"
                isProfileStatusList
            />
        </div>
    );
};

export { ActivityOverview };
