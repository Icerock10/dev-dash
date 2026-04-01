import { Modal, Button } from '~/shared/ui/components/components';
import { type JobDto } from '~/entities/job/index';
import { JobPreviewSummary } from './job-preview-summary';
import { JobPreviewStatuses } from './job-preview-statuses';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { getJobInfo } from '../model/libs/helpers/helpers';
import { useJobPreview } from './use-job-preview';
import { JobPreviewTags } from './job-preview-tags';
import { JobPreviewNotes } from './job-preview-notes';

type Properties = {
    isModalOpen: boolean;
    onPreviewClose: () => void;
    job: JobDto;
    logo: React.ReactNode;
    onEdit: () => void;
};

const JobPreview: React.FC<Properties> = ({
    isModalOpen,
    onPreviewClose,
    job,
    logo,
    onEdit,
}) => {
    const jobInfo = getJobInfo(job);

    const { onJobDelete } = useJobPreview({
        jobId: job.id,
        onClose: onPreviewClose,
    });

    return (
        <Modal
            title={job.title}
            subTitle={`${job.company} · ${String(job.location)}`}
            onClose={onPreviewClose}
            isOpen={isModalOpen}
            logo={logo}
        >
            <div className="flex flex-col gap-5 px-6 py-5 font-mono">
                <JobPreviewSummary jobInfo={jobInfo} />
                <JobPreviewTags tags={job.tags} />
                <JobPreviewNotes notes={job.notes} />
                <JobPreviewStatuses onPreviewClose={onPreviewClose} job={job} />
            </div>
            <div className="flex gap-3 border-t border-[#1e2a45] bg-[#0c1020] px-6 py-4">
                <Button
                    onClick={onEdit}
                    label="Edit"
                    variant={ButtonVariant.SECONDARY}
                />
                <Button
                    className="border-red-500/20 text-red-400! hover:bg-red-500/10!"
                    label="Delete"
                    variant={ButtonVariant.SECONDARY}
                    onClick={() => void onJobDelete()}
                />
            </div>
        </Modal>
    );
};

export { JobPreview };
