import { type JobDto, CompanyLogo } from '~/entities/job/index';
import { JobPreview } from '~/features/job/preview/ui/job-preview';
import { JobForm } from '~/features/job/manage/ui/job-form';
import { useJobCard } from './use-job-card';
import { JobCardHeader } from './job-card-header';
import { JobCardFooter } from './job-card-footer';
import { JobCardBody } from './job-card-body';

type Properties = {
    job: JobDto;
    openJobId: string | null;
    onOpen: (payload: null | string) => void;
};

const JobCard: React.FC<Properties> = ({ job, openJobId, onOpen }) => {
    const {
        isOpen,
        recruiterInitial,
        previewJob,
        editJob,
        onJobStatusToggle,
        openJobPreview,
        closeEditJob,
        closeJobPreview,
        onEdit,
    } = useJobCard({ job, openJobId, onOpen });

    const companyLogo = <CompanyLogo jobCompanyName={job.company} />;

    return (
        <>
            <JobPreview
                isModalOpen={Boolean(previewJob)}
                onPreviewClose={closeJobPreview}
                job={job}
                logo={companyLogo}
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
                <JobCardHeader
                    job={job}
                    isOpen={isOpen}
                    onJobStatusToggle={onJobStatusToggle}
                    companyLogo={companyLogo}
                />
                <JobCardBody job={job} />
                <JobCardFooter
                    recruiterInitial={recruiterInitial}
                    recruiterName={job.recruiterName}
                />
            </div>
        </>
    );
};

export { JobCard };
