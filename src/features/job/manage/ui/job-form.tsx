import {
    Button,
    Modal,
    Input,
    Textarea,
    Select,
} from '~/shared/ui/components/components';
import { type JobDto } from '~/entities/job/index';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { JOB_STATUS_OPTIONS } from '../model/libs/constants/constants';
import { useJobForm } from './use-job-form';

type Properties = {
    onJobFormModalClose: () => void;
    isModalOpen: boolean;
    job?: JobDto | null;
};

const JobForm: React.FC<Properties> = ({
    onJobFormModalClose,
    isModalOpen,
    job,
}) => {
    const { control, errors, tagErrorMessage, onSubmit } = useJobForm({
        job,
        onClose: onJobFormModalClose,
    });

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
