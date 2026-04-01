import { formatAndGetStatusBadges, type JobDto } from '~/entities/job/index';
import { JobStatusChange } from '~/features/job/status-change/ui/job-status-change';

type Properties = {
    job: JobDto;
    onPreviewClose: () => void;
};

const JobPreviewStatuses: React.FC<Properties> = ({ job, onPreviewClose }) => {
    const statusBadges = formatAndGetStatusBadges();
    return (
        <div>
            <h1 className="mb-2.5 text-xs tracking-wide text-slate-500 uppercase">
                Status
            </h1>
            <div className="flex flex-wrap gap-2">
                {statusBadges.map((badge) => (
                    <JobStatusChange
                        onStatusClose={onPreviewClose}
                        jobStatus={job.status}
                        key={badge}
                        statusBadge={badge}
                        jobId={job.id}
                        variant="bordered"
                    />
                ))}
            </div>
        </div>
    );
};

export { JobPreviewStatuses };
