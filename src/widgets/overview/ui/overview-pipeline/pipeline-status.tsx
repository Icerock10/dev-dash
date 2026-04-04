import {
    JOB_STATUS_COLORS,
    formatAndGetStatusBadges,
} from '~/entities/job/index';
import { getClassNames, sortStatusBadges } from '~/shared/libs/helpers/helpers';

type Properties = {
    statusCounts: Record<string, number>;
};

const PipelineStatusList: React.FC<Properties> = ({ statusCounts }) => {
    const sortedStatusBadges = sortStatusBadges(
        formatAndGetStatusBadges(),
        statusCounts,
    );
    return (
        <div className="mb-5 flex flex-wrap gap-3">
            {sortedStatusBadges.map((badge) => {
                const statusColor =
                    JOB_STATUS_COLORS[
                        badge.toUpperCase() as keyof typeof JOB_STATUS_COLORS
                    ];
                return (
                    <div key={badge} className="flex items-center gap-2">
                        <span
                            className={getClassNames(
                                'h-2 w-2 rounded-full',
                                statusColor.bg,
                            )}
                        />
                        <span
                            key={badge}
                            className="font-mono text-[11px] text-slate-400"
                        >
                            {badge}
                        </span>
                        <span className="font-mono text-[11px] font-medium text-white">
                            {statusCounts[badge.toUpperCase()] || '0'}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export { PipelineStatusList };
