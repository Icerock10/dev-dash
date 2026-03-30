import { JOB_STATUS_COLORS } from '~/entities/job/ui/libs/helpers/helpers';
import { normalizeStatus } from '~/shared/libs/helpers/helpers';
import { ArrowDownIcon } from '~/shared/ui/icons/icons';
import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';

type Properties = {
    isOpen: boolean;
    jobStatus: string;
    onJobStatusOpen: () => void;
};

const JobCardStatus: React.FC<Properties> = ({
    isOpen,
    jobStatus,
    onJobStatusOpen,
}) => {
    const statuses = Object.keys(JOB_STATUS_COLORS).map((status) =>
        normalizeStatus(status),
    );

    const statusColor =
        JOB_STATUS_COLORS[jobStatus as keyof typeof JOB_STATUS_COLORS];
    const formattedStatus = normalizeStatus(jobStatus);

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
                onClick={onJobStatusOpen}
            />
            {isOpen && (
                <div className="absolute top-full right-0 z-20 mt-1.5 min-w-35 rounded-xl border border-[#1e2a45] bg-[#111827] p-1.5">
                    {statuses.map((status) => {
                        const itemColor =
                            JOB_STATUS_COLORS[
                                status.toUpperCase() as keyof typeof JOB_STATUS_COLORS
                            ];
                        const selectedStatusClasses =
                            status.toLowerCase() === jobStatus.toLowerCase()
                                ? 'bg-white/4 text-white'
                                : 'hover:bg-white/4 hover:text-white';

                        return (
                            <div
                                key={status}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] text-white transition-colors ${selectedStatusClasses}`}
                            >
                                <span
                                    className={`${itemColor.bg} h-1.5 w-1.5 shrink-0 rounded-full`}
                                ></span>
                                {status}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export { JobCardStatus };
