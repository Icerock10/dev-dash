import {
    JOB_STATUS_COLORS,
    formatAndGetStatusBadges,
} from '~/entities/job/ui/libs/helpers/helpers';
import { type JobStatus, ButtonVariant } from '~/shared/libs/enums/enums';
import { normalizeStatus } from '~/shared/libs/helpers/helpers';
import { type ValueOf } from '~/shared/libs/types/types';
import { ArrowDownIcon } from '~/shared/ui/icons/icons';
import { Button } from '~/shared/ui/components/components';
import { JobStatusBadge } from './job-status-badge';

type Properties = {
    isOpen: boolean;
    jobStatus: ValueOf<typeof JobStatus>;
    onJobStatusToggle: () => void;
    jobId: string;
};

const JobCardStatus: React.FC<Properties> = ({
    isOpen,
    jobStatus,
    onJobStatusToggle,
    jobId,
}) => {
    const statusColor = JOB_STATUS_COLORS[jobStatus];
    const formattedStatus = normalizeStatus(jobStatus);
    const statusBadges = formatAndGetStatusBadges();
    return (
        <div
            className={`relative flex items-center gap-1.5 rounded-md border border-slate-800 px-2.5 py-1 ${statusColor.color}`}
        >
            <span
                className={`${statusColor.bg} h-1.5 w-1.5 shrink-0 rounded-full`}
            ></span>
            <Button
                icon={<ArrowDownIcon />}
                variant={ButtonVariant.GHOST}
                label={formattedStatus}
                onClick={(event: React.BaseSyntheticEvent) => {
                    event.stopPropagation();
                    onJobStatusToggle();
                }}
                className="text-[11px]"
            />
            {isOpen && (
                <div className="absolute top-full right-0 z-20 mt-1.5 min-w-35 rounded-xl border border-[#1e2a45] bg-[#111827] p-1.5">
                    {statusBadges.map((badge) => (
                        <JobStatusBadge
                            key={badge}
                            onDomNodeClose={onJobStatusToggle}
                            jobStatusBadge={badge}
                            jobId={jobId}
                            jobStatus={jobStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export { JobCardStatus };
