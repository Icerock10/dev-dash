import { getClassNames } from '~/shared/libs/helpers/helpers';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { USER_JOB_STATUS_CONFIG } from '../../model/libs/constants/constants';

type Properties = {
    userJobSearchStatus?: UserDto['jobSearchStatus'];
    handleStatusUpdate: (payload: {
        jobSearchStatus: UserDto['jobSearchStatus'];
    }) => Promise<void>;
};

const JobStatusSection: React.FC<Properties> = ({
    userJobSearchStatus,
    handleStatusUpdate,
}) => {
    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <h2 className="mb-4 text-sm font-medium text-white">
                Job search status
            </h2>
            <div className="grid grid-cols-3 gap-2">
                {USER_JOB_STATUS_CONFIG.map((jobStatus) => {
                    const isJobSeachStatusActive =
                        userJobSearchStatus === jobStatus.status;

                    return (
                        <div
                            onClick={() => {
                                void handleStatusUpdate({
                                    jobSearchStatus: jobStatus.status,
                                });
                            }}
                            key={jobStatus.status}
                            className={getClassNames(
                                'flex cursor-pointer flex-col items-start gap-1.5 rounded-xl border border-white/6 px-3 py-3',
                                isJobSeachStatusActive &&
                                    jobStatus.itemStyles.style,
                            )}
                        >
                            <div className="flex items-center gap-1.5">
                                <span
                                    className={getClassNames(
                                        'h-2 w-2 rounded-full',
                                        jobStatus.itemStyles.bg,
                                    )}
                                />
                                <p
                                    className={getClassNames(
                                        'text-[12px] font-medium lowercase first-letter:uppercase',
                                        isJobSeachStatusActive &&
                                            jobStatus.itemStyles.color,
                                    )}
                                >
                                    {jobStatus.status.replace('_', ' ')}
                                </p>
                            </div>
                            <span className="text-[11px] text-slate-500">
                                {jobStatus.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { JobStatusSection };
