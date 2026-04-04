import { JOB_STATUS_COLORS } from '~/entities/job/index';
import { getClassNames } from '~/shared/libs/helpers/helpers';

const JOBS_COUNT_OFFSET = 100;

type Properties = {
    totalJobsCount: number;
    statusCounts: Record<string, number>;
};

const PipelineBar: React.FC<Properties> = ({
    statusCounts,
    totalJobsCount,
}) => (
    <div className="mb-4 flex h-1.5 gap-1 rounded-2xl">
        {Object.entries(statusCounts).map(([status, count]) => {
            const jobsTotalCountProgress = String(
                (count / totalJobsCount) * JOBS_COUNT_OFFSET,
            );
            const statusBackground =
                JOB_STATUS_COLORS[status as keyof typeof JOB_STATUS_COLORS].bg;
            return (
                <div
                    key={status}
                    className={getClassNames(
                        'h-1.5 rounded-full',
                        statusBackground,
                    )}
                    style={{
                        width: `${jobsTotalCountProgress}%`,
                    }}
                />
            );
        })}
    </div>
);

export { PipelineBar };
