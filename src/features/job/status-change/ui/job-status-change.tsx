import { JOB_STATUS_COLORS } from '~/entities/job/model/libs/helpers/helpers';
import { type JobStatus } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';
import { notification } from '~/shared/libs/modules/notification/notification';
import { updateJobStatus } from '~/features/job/model/actions';
import { useLoading } from '~/shared/hooks/hooks';
import { getClassNames } from '~/shared/libs/helpers/helpers';

type Properties = {
    jobId: string;
    jobStatus: ValueOf<typeof JobStatus>;
    onStatusClose: () => void;
    statusBadge: string;
    variant?: 'default' | 'bordered';
};

const JobStatusChange: React.FC<Properties> = ({
    jobId,
    jobStatus,
    onStatusClose,
    statusBadge,
    variant = 'default',
}) => {
    const { startLoading, stopLoading } = useLoading();

    const onStatusSelect = async (
        status: Properties['jobStatus'],
    ): Promise<void> => {
        try {
            startLoading();
            await updateJobStatus(jobId, status);
            onStatusClose();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const normalizedStatus = statusBadge.toUpperCase();

    const itemColor =
        JOB_STATUS_COLORS[normalizedStatus as keyof typeof JOB_STATUS_COLORS];

    const statusBadgeClasses = getClassNames(
        'flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] hover:bg-white/4 hover:text-white text-white transition-colors',
        variant === 'bordered' && 'border border-[#1e2a45]',
        normalizedStatus === jobStatus && 'bg-white/4 text-white',
    );

    return (
        <div
            onClick={(event: React.BaseSyntheticEvent) => {
                event.stopPropagation();
                void onStatusSelect(
                    normalizedStatus as Properties['jobStatus'],
                );
            }}
            className={statusBadgeClasses}
        >
            <span
                className={`${itemColor.bg} h-1.5 w-1.5 shrink-0 rounded-full`}
            ></span>
            <span>{statusBadge}</span>
        </div>
    );
};

export { JobStatusChange };
