import { JOB_STATUS_COLORS } from '~/entities/job/ui/libs/helpers/helpers';
import { type JobStatus, ButtonVariant } from '~/shared/libs/enums/enums';
import { notification } from '~/shared/libs/modules/notification/notification';
import { normalizeStatus } from '~/shared/libs/helpers/helpers';
import { type ValueOf } from '~/shared/libs/types/types';
import { ArrowDownIcon } from '~/shared/ui/icons/icons';
import { Button } from '~/shared/ui/components/components';
import { updateJobStatus } from '~/entities/job/model/actions/update-job-status.action';
import { useLoading } from '~/shared/hooks/hooks';

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
    const statuses = Object.keys(JOB_STATUS_COLORS).map((status) =>
        normalizeStatus(status),
    );
    const { startLoading, stopLoading } = useLoading();
    const statusColor = JOB_STATUS_COLORS[jobStatus];
    const formattedStatus = normalizeStatus(jobStatus);

    const onStatusSelect = async (status: string): Promise<void> => {
        try {
            startLoading();
            await updateJobStatus(jobId, status as Properties['jobStatus']);
            onJobStatusToggle();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

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
                onClick={onJobStatusToggle}
                className="text-[11px]"
            />
            {isOpen && (
                <div className="absolute top-full right-0 z-20 mt-1.5 min-w-35 rounded-xl border border-[#1e2a45] bg-[#111827] p-1.5">
                    {statuses.map((status) => {
                        const itemColor =
                            JOB_STATUS_COLORS[
                                status.toUpperCase() as Properties['jobStatus']
                            ];
                        const selectedStatusClasses =
                            status.toLowerCase() === jobStatus.toLowerCase()
                                ? 'bg-white/4 text-white'
                                : 'hover:bg-white/4 hover:text-white';

                        return (
                            <div
                                onClick={() =>
                                    void onStatusSelect(status.toUpperCase())
                                }
                                key={status}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] text-white transition-colors ${selectedStatusClasses}`}
                            >
                                <span
                                    className={`${itemColor.bg} h-1.5 w-1.5 shrink-0 rounded-full`}
                                ></span>
                                <span>{status}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export { JobCardStatus };
