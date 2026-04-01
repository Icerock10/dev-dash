import { useCallback, useState } from '~/shared/hooks/hooks';
import { type JobDto } from '~/entities/job/index';
import { firstCharUpperCase } from '~/shared/libs/helpers/helpers';

type Payload = {
    job: JobDto;
    openJobId: string | null;
    onOpen: (payload: null | string) => void;
};

type UseJobCardReturn = {
    isOpen: boolean;
    recruiterInitial: string;
    previewJob: JobDto | null;
    editJob: JobDto | null;
    onJobStatusToggle: () => void;
    openJobPreview: () => void;
    closeEditJob: () => void;
    closeJobPreview: () => void;
    onEdit: () => void;
};

const useJobCard = ({ job, openJobId, onOpen }: Payload): UseJobCardReturn => {
    const isOpen = openJobId === job.id;
    const recruiterInitial = job.recruiterName
        ? firstCharUpperCase(job.recruiterName)
        : '?';

    const [previewJob, setPreviewJob] = useState<JobDto | null>(null);
    const [editJob, setEditJob] = useState<JobDto | null>(null);

    const onJobStatusToggle = useCallback(() => {
        onOpen(isOpen ? null : job.id);
    }, [isOpen, job.id, onOpen]);

    const openJobPreview = useCallback(() => {
        setPreviewJob(job);
    }, [job]);
    const openEditJob = useCallback(() => {
        setEditJob(job);
    }, [job]);
    const closeEditJob = useCallback(() => {
        setEditJob(null);
    }, []);
    const closeJobPreview = useCallback(() => {
        setPreviewJob(null);
    }, []);

    const onEdit = useCallback(() => {
        openEditJob();
        closeJobPreview();
    }, [closeJobPreview, openEditJob]);

    return {
        isOpen,
        recruiterInitial,
        previewJob,
        editJob,
        onJobStatusToggle,
        openJobPreview,
        closeEditJob,
        closeJobPreview,
        onEdit,
    };
};

export { useJobCard, type UseJobCardReturn };
