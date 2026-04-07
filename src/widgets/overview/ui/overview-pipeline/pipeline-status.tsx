import {
    JOB_STATUS_COLORS,
    formatAndGetStatusBadges,
} from '~/entities/job/index';
import { getClassNames, sortStatusBadges } from '~/shared/libs/helpers/helpers';
import { type ValueOf } from '~/shared/libs/types/types';

const MIN_STATUS_COUNT = 0;

const PipelineStatusVariant = {
    DEFAULT: 'default',
    BRAND: 'brand',
} as const;

type Properties = {
    statusCounts: Record<string, number>;
    variant?: ValueOf<typeof PipelineStatusVariant>;
    isProfileStatusList?: boolean;
};

const PipelineStatusList: React.FC<Properties> = ({
    statusCounts,
    variant = PipelineStatusVariant.DEFAULT,
    isProfileStatusList = false,
}) => {
    const sortedStatusBadges = sortStatusBadges(
        formatAndGetStatusBadges(),
        statusCounts,
    );
    const activeStatusBadges = sortedStatusBadges.filter(
        (badge) => statusCounts[badge.toUpperCase()] > MIN_STATUS_COUNT,
    );

    const badges = isProfileStatusList
        ? activeStatusBadges
        : sortedStatusBadges;

    const isBrand = variant === PipelineStatusVariant.BRAND;

    return (
        <div
            className={getClassNames(
                'flex flex-wrap gap-3',
                !isBrand && 'mb-5',
            )}
        >
            {badges.map((badge) => {
                const key =
                    badge.toUpperCase() as keyof typeof JOB_STATUS_COLORS;
                const statusColor = JOB_STATUS_COLORS[key];
                const count = statusCounts[key] ?? '0';

                return isBrand ? (
                    <div
                        key={badge}
                        className="flex min-w-30 flex-1 flex-col gap-2 rounded-xl border border-[#1e2a45] bg-[#0c1020] p-4"
                    >
                        <div className="flex items-center gap-1.5">
                            <span
                                className={getClassNames(
                                    'h-1.5 w-1.5 rounded-full',
                                    statusColor.bg,
                                )}
                            />
                            <span className="text-[10px] tracking-wide text-slate-500 uppercase">
                                {badge}
                            </span>
                        </div>
                        <div
                            className={getClassNames(
                                'font-mono text-2xl font-semibold',
                                statusColor.color,
                            )}
                        >
                            {count}
                        </div>
                    </div>
                ) : (
                    <div key={badge} className="flex items-center gap-2">
                        <span
                            className={getClassNames(
                                'h-2 w-2 rounded-full',
                                statusColor.bg,
                            )}
                        />
                        <span className="font-mono text-[11px] text-slate-400">
                            {badge}
                        </span>
                        <span className="font-mono text-[11px] font-medium text-white">
                            {count}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export { PipelineStatusList };
