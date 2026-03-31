import { type JobDto } from '../model/libs/types/types';
import { useCallback, useState } from '~/shared/hooks/hooks';
import { JobTagVariant, JobTag } from './job-tag';
import {
    firstCharUpperCase,
    normalizeStatus,
} from '~/shared/libs/helpers/helpers';
import { JOB_STATUS_COLORS } from '~/entities/job/ui/libs/helpers/helpers';
import { JobPreview } from './job-preview';
import { CompanyLogo } from './company-logo';
import { JobForm } from '~/screens/jobs/ui/job-form';

import { JobCardStatus } from '~/features/job/index';

type Properties = {
    job: JobDto;
    openJobId: string | null;
    onOpen: (payload: null | string) => void;
};

const JobCard: React.FC<Properties> = ({ job, openJobId, onOpen }) => {
    const recruiterInitial = job.recruiterName
        ? firstCharUpperCase(job.recruiterName)
        : '?';
    const isOpen = openJobId === job.id;

    const onJobStatusToggle = useCallback(() => {
        onOpen(isOpen ? null : job.id);
    }, [isOpen, job.id, onOpen]);

    const [previewJob, setPreviewJob] = useState<JobDto | null>(null);
    const [editJob, setEditJob] = useState<JobDto | null>(null);

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

    const companyLogo = <CompanyLogo jobCompanyName={job.company} />;
    const statusBadges = Object.keys(JOB_STATUS_COLORS).map((status) =>
        normalizeStatus(status),
    );

    return (
        <>
            <JobPreview
                isModalOpen={Boolean(previewJob)}
                onPreviewClose={closeJobPreview}
                job={job}
                logo={companyLogo}
                statusBadges={statusBadges}
                onEdit={onEdit}
            />
            <JobForm
                onJobFormModalClose={closeEditJob}
                isModalOpen={Boolean(editJob)}
                job={job}
            />

            <div
                onClick={openJobPreview}
                className="cursor-pointer rounded-xl border border-white/6 bg-[#161b27] p-4 hover:bg-[#1c2235]"
            >
                <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                        {companyLogo}
                        <div>
                            <div className="text-sm font-medium text-white">
                                {job.company}
                            </div>
                            <div className="text-[11px] text-slate-500">
                                {job.location}
                            </div>
                        </div>
                    </div>
                    <JobCardStatus
                        jobStatus={job.status}
                        isOpen={isOpen}
                        onJobStatusToggle={onJobStatusToggle}
                        jobId={job.id}
                        statusBadges={statusBadges}
                    />
                </div>
                <div className="mb-1 text-[15px] leading-snug font-medium text-white">
                    {job.title}
                </div>
                <div className="mt-2 mb-3 flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                        <JobTag key={tag} label={tag} />
                    ))}
                    {job.salaryRange && (
                        <JobTag
                            label={job.salaryRange}
                            variant={JobTagVariant.SALARY}
                        />
                    )}
                </div>
                <div className="flex items-center justify-between border-t border-white/6 pt-3">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[9px] font-medium text-white">
                            {recruiterInitial}
                        </div>
                        <span className="text-[11px] text-slate-500">
                            {job.recruiterName}
                        </span>
                    </div>
                    <span className="text-[11px] text-slate-600">
                        View details →
                    </span>
                </div>
            </div>
        </>
    );
};

export { JobCard };
