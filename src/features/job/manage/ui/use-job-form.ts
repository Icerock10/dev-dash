import {
    jobValidationSchema,
    type JobCreateDto,
    type JobDto,
} from '~/entities/job/index';
import { notification } from '~/shared/libs/modules/notification/notification';
import { type Control, type FieldErrors } from 'react-hook-form';
import {
    useLoading,
    useAppForm,
    useEffect,
    useMemo,
} from '~/shared/hooks/hooks';
import { createJob, updateJob } from '~/features/job/model/actions';
import { JobStatus } from '~/shared/libs/enums/enums';

type Payload = {
    job?: JobDto | null;
    onClose: () => void;
};

type UserJobFormReturn = {
    control: Control<JobCreateDto>;
    errors: FieldErrors<JobCreateDto>;
    onSubmit: (event: React.BaseSyntheticEvent) => void;
    tagErrorMessage: string;
};

const useJobForm = ({ job, onClose }: Payload): UserJobFormReturn => {
    const defaultValues = useMemo(
        () => ({
            company: job?.company ?? '',
            title: job?.title ?? '',
            location: job?.location ?? '',
            salaryRange: job?.salaryRange ?? '',
            tags: job?.tags ?? [''],
            recruiterName: job?.recruiterName ?? '',
            status: job?.status ?? JobStatus.NEW,
            notes: job?.notes ?? '',
        }),
        [job],
    );

    const { control, errors, handleSubmit, reset } = useAppForm<JobCreateDto>({
        defaultValues,
        validationSchema: jobValidationSchema,
    });

    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onJobUpdate = async (payload: JobCreateDto): Promise<void> => {
        try {
            startLoading();
            await (job ? updateJob(job.id, payload) : createJob(payload));
            reset();
            onClose();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const onSubmit = (event: React.BaseSyntheticEvent): void => {
        void handleSubmit(onJobUpdate)(event);
    };

    const firstTagError = errors.tags?.find?.((error) =>
        Boolean(error?.message),
    );
    const tagErrorMessage = firstTagError?.message ?? '';

    return { control, errors, onSubmit, tagErrorMessage };
};

export { useJobForm };
