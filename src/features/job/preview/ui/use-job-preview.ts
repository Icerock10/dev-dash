import { notification } from '~/shared/libs/modules/notification/notification';
import { useLoading } from '~/shared/hooks/hooks';
import { deleteJob } from '~/features/job/model/actions';

type Payload = {
    jobId: string;
    onClose: () => void;
};

const useJobPreview = ({
    jobId,
    onClose,
}: Payload): { onJobDelete: () => Promise<void> } => {
    const { startLoading, stopLoading } = useLoading();

    const onJobDelete = async (): Promise<void> => {
        try {
            startLoading();
            await deleteJob(jobId);
            onClose();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    return { onJobDelete };
};

export { useJobPreview };
