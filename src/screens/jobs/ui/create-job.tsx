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
} from '~/entities/job/model/libs/validation-schemas/job-create-validation.schema';
import { notification } from '~/shared/libs/modules/notification/notification';
import { useLoading, useAppForm } from '~/shared/hooks/hooks';
import { createJob } from '~/entities/job/model/actions/create-job.action';
import { ButtonVariant, JobStatus } from '~/shared/libs/enums/enums';
import { normalizeStatus } from '~/shared/libs/helpers/helpers';

const DefaultJobCreateValues = {
    company: '',
    title: '',
    location: '',
    salaryRange: '',
    tags: [''],
    recruiterName: '',
    status: JobStatus.NEW,
    notes: '',
};

type Properties = {
    toggleModal: () => void;
    isModalOpen: boolean;
};

const JOB_STATUS_OPTIONS = Object.values(JobStatus).map((status) => ({
    label: normalizeStatus(status),
    value: status,
}));

const CreateJob: React.FC<Properties> = ({ toggleModal, isModalOpen }) => {
    const { control, errors, handleSubmit, reset } = useAppForm<JobCreateDto>({
        defaultValues: DefaultJobCreateValues,
        validationSchema: jobValidationSchema,
    });

    const { startLoading, stopLoading } = useLoading();

    const onModalClose = (): void => {
        toggleModal();
        reset();
    };

    const onJobCreate = async (job: JobCreateDto): Promise<void> => {
        try {
            startLoading();
            await createJob(job);
            toggleModal();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const onSubmit = (event: React.BaseSyntheticEvent): void => {
        void handleSubmit(onJobCreate)(event);
        reset();
    };
    const firstTagError = errors.tags?.find?.((error) =>
        Boolean(error?.message),
    );
    const tagErrorMessage = firstTagError?.message ?? '';

    return (
        <Modal
            title="Add listing"
            subTitle="Fill in the details about the position"
            isOpen={isModalOpen}
            onClose={onModalClose}
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
                    onClick={onModalClose}
                    label="Cancel"
                    variant={ButtonVariant.SECONDARY}
                />
                <Button
                    onClick={onSubmit}
                    className="text-white"
                    label="Add listing"
                />
            </div>
        </Modal>
    );
};

export { CreateJob };
