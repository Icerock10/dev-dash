import { notification } from '~/shared/libs/modules/notification/notification';
import { updateJobStatus } from '~/features/job/model/actions';
import { useLoading } from '~/shared/hooks/hooks';
import { type JobStatus } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';

type TJobStatus = ValueOf<typeof JobStatus>;

type Payload = {
    jobId: string;
    onStatusClose: () => void;
    normalizedStatus: string;
};

const useJobStatus = ({
    jobId,
    onStatusClose,
    normalizedStatus,
}: Payload): { onStatusClick: (event: React.BaseSyntheticEvent) => void } => {
    const { startLoading, stopLoading } = useLoading();

    const onStatusSelect = async (status: TJobStatus): Promise<void> => {
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

    const onStatusClick = (event: React.BaseSyntheticEvent): void => {
        event.stopPropagation();
        void onStatusSelect(normalizedStatus as TJobStatus);
    };

    return { onStatusClick };
};

export { useJobStatus };
