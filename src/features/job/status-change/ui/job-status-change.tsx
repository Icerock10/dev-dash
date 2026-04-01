import { JOB_STATUS_COLORS } from '~/entities/job/index';
import { type JobStatus } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';
import { getClassNames } from '~/shared/libs/helpers/helpers';
import { JobStatusVariant } from '../model/libs/enums/enums';
import { useJobStatus } from './use-job-status';

type Properties = {
    jobId: string;
    jobStatus: ValueOf<typeof JobStatus>;
    onStatusClose: () => void;
    statusBadge: string;
    variant?: ValueOf<typeof JobStatusVariant>;
};

const JobStatusChange: React.FC<Properties> = ({
    jobId,
    jobStatus,
    onStatusClose,
    statusBadge,
    variant = JobStatusVariant.DEFAULT,
}) => {
    const normalizedStatus = statusBadge.toUpperCase();

    const { onStatusClick } = useJobStatus({
        jobId,
        onStatusClose,
        normalizedStatus,
    });

    const itemColor =
        JOB_STATUS_COLORS[normalizedStatus as keyof typeof JOB_STATUS_COLORS];

    const statusBadgeClasses = getClassNames(
        'flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] hover:bg-white/4 hover:text-white text-white transition-colors',
        variant === JobStatusVariant.BORDERED && 'border border-[#1e2a45]',
        normalizedStatus === jobStatus && 'bg-white/4 text-white',
    );

    return (
        <div onClick={onStatusClick} className={statusBadgeClasses}>
            <span
                className={getClassNames(
                    'h-1.5 w-1.5 shrink-0 rounded-full',
                    itemColor.bg,
                )}
            ></span>
            <span>{statusBadge}</span>
        </div>
    );
};

export { JobStatusChange };
