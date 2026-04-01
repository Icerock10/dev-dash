import { JobCardStatus } from './job-card-status';
import { type JobDto } from '~/entities/job/index';

type Properties = {
    job: JobDto;
    onJobStatusToggle: () => void;
    companyLogo: React.ReactNode;
    isOpen: boolean;
};

const JobCardHeader: React.FC<Properties> = ({
    job,
    onJobStatusToggle,
    isOpen,
    companyLogo,
}) => {
    return (
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
            />
        </div>
    );
};

export { JobCardHeader };
