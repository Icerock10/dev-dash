import { JOB_STATUS_COLORS } from '~/entities/job/ui/libs/helpers/helpers';
import { type JobStatus } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';
import { notification } from '~/shared/libs/modules/notification/notification';
import { updateJobStatus } from '~/entities/job/model/actions/actions';
import { useLoading } from '~/shared/hooks/hooks';
import { getClassNames } from '~/shared/libs/helpers/helpers';

type Properties = {
    jobId: string;
    jobStatus: ValueOf<typeof JobStatus>;
    onDomNodeClose: () => void;
    jobStatusBadge: string;
    variant?: 'default' | 'bordered';
};

const JobStatusBadge: React.FC<Properties> = ({
    jobId,
    jobStatus,
    onDomNodeClose,
    jobStatusBadge,
    variant = 'default',
}) => {
    const { startLoading, stopLoading } = useLoading();

    const onStatusSelect = async (
        status: Properties['jobStatus'],
    ): Promise<void> => {
        try {
            startLoading();
            await updateJobStatus(jobId, status);
            onDomNodeClose();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const upperCasedStatus = jobStatusBadge.toUpperCase();

    const itemColor =
        JOB_STATUS_COLORS[upperCasedStatus as keyof typeof JOB_STATUS_COLORS];

    const statusBadgeClasses = getClassNames(
        'flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] hover:bg-white/4 hover:text-white text-white transition-colors',
        variant === 'bordered' && 'border border-[#1e2a45]',
        upperCasedStatus === jobStatus && 'bg-white/4 text-white',
    );

    return (
        <div
            onClick={(event: React.BaseSyntheticEvent) => {
                event.stopPropagation();
                void onStatusSelect(
                    upperCasedStatus as Properties['jobStatus'],
                );
            }}
            className={statusBadgeClasses}
        >
            <span
                className={`${itemColor.bg} h-1.5 w-1.5 shrink-0 rounded-full`}
            ></span>
            <span>{jobStatusBadge}</span>
        </div>
    );
};

export { JobStatusBadge };
