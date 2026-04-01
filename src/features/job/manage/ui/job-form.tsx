import {
    Button,
    Modal,
    Input,
    Textarea,
    Select,
} from '~/shared/ui/components/components';
import {
    jobValidationSchema,
    type JobCreateDto,
    type JobDto,
} from '~/entities/job/index';
import { notification } from '~/shared/libs/modules/notification/notification';
import {
    useLoading,
    useAppForm,
    useEffect,
    useMemo,
} from '~/shared/hooks/hooks';
import { createJob, updateJob } from '~/features/job/model/actions';
import { ButtonVariant, JobStatus } from '~/shared/libs/enums/enums';
import { normalizeStatus } from '~/shared/libs/helpers/helpers';

type Properties = {
    onJobFormModalClose: () => void;
    isModalOpen: boolean;
    job?: JobDto | null;
};

const JOB_STATUS_OPTIONS = Object.values(JobStatus).map((status) => ({
    label: normalizeStatus(status),
    value: status,
}));

const JobForm: React.FC<Properties> = ({
    onJobFormModalClose,
    isModalOpen,
    job,
}) => {
    const DefaultJobCreateValues = useMemo(
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
        defaultValues: DefaultJobCreateValues,
        validationSchema: jobValidationSchema,
    });

    const { startLoading, stopLoading } = useLoading();

    const onJobUpdate = async (payload: JobCreateDto): Promise<void> => {
        try {
            startLoading();

            const jobAction = job
                ? updateJob(job.id, payload)
                : createJob(payload);

            await jobAction;

            reset();
            onJobFormModalClose();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    useEffect(() => {
        reset(DefaultJobCreateValues);
    }, [DefaultJobCreateValues, reset]);

    const onSubmit = (event: React.BaseSyntheticEvent): void => {
        void handleSubmit(onJobUpdate)(event);
    };
    const firstTagError = errors.tags?.find?.((error) =>
        Boolean(error?.message),
    );
    const tagErrorMessage = firstTagError?.message ?? '';

    return (
        <Modal
            title={job ? 'Update Listing' : 'Add listing'}
            subTitle="Fill in the details about the position"
            isOpen={isModalOpen}
            onClose={onJobFormModalClose}
        >
            <form className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto px-6 py-5">
                <div className="grid grid-cols-2 gap-x-5 text-white">
                    <Input
                        label="Company *"
                        name="company"
                        control={control}
                        errors={errors}
                        placeholder="e.g. Stripe"
                    />
                    <Input
                        label="Job title *"
                        name="title"
                        control={control}
                        errors={errors}
                        placeholder="e.g. Frontend Engineer"
                    />
                    <Input
                        label="Location"
                        name="location"
                        control={control}
                        errors={errors}
                        placeholder="e.g. Berlin / Remote"
                    />
                    <Input
                        label="Salary Range *"
                        name="salaryRange"
                        control={control}
                        errors={errors}
                        placeholder="e.g. €80–100k"
                    />
                    <div className="col-span-2">
                        <Input
                            label="Tags - comma separated"
                            name="tags"
                            control={control}
                            errors={errors}
                            errorMessage={tagErrorMessage}
                            placeholder="e.g. React, TypeScript, Remote"
                            maxLength={Infinity}
                        />
                    </div>
                    <Input
                        label="Recruiter"
                        name="recruiterName"
                        control={control}
                        errors={errors}
                        placeholder="e.g. Anna Müller"
                    />
                    <Select
                        options={JOB_STATUS_OPTIONS}
                        name="status"
                        control={control}
                        errors={errors}
                        label="Status"
                    />
                    <div className="col-span-2">
                        <Textarea
                            label="Notes"
                            name="notes"
                            control={control}
                            errors={errors}
                            placeholder="Any details about the role, recruiter contact, interview notes..."
                        />
                    </div>
                </div>
            </form>
            <div className="flex gap-3 border-t border-[#1e2a45] bg-[#0c1020] px-6 py-4">
                <Button
                    onClick={onJobFormModalClose}
                    label="Cancel"
                    variant={ButtonVariant.SECONDARY}
                />
                <Button
                    onClick={onSubmit}
                    className="text-white"
                    label={job ? 'Update' : 'Add listing'}
                />
            </div>
        </Modal>
    );
};

export { JobForm };
