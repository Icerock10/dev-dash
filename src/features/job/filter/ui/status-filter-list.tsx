import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { DEFAULT_STATUS_COUNT } from '../model/libs/constants/constants';
import { useMemo } from '~/shared/hooks/hooks';
import { getClassNames } from '~/shared/libs/helpers/helpers';
import {
    formatAndGetStatusBadges,
    JOB_STATUS_COLORS,
} from '~/entities/job/index';
import { JobFilter } from '../model/libs/enums/enums';

type Properties = {
    resetFilters: () => void;
    statusSum: number;
    statusFiltersWithCount: Record<string, number>;
    setFilter: (key: string, value: string) => void;
    searchParams: URLSearchParams;
};

const StatusFilterList: React.FC<Properties> = ({
    resetFilters,
    statusSum,
    statusFiltersWithCount,
    setFilter,
    searchParams,
}) => {
    const sortedStatusBadges = useMemo(
        () =>
            formatAndGetStatusBadges().toSorted(
                (a, b) =>
                    (statusFiltersWithCount[b.toUpperCase()] ??
                        DEFAULT_STATUS_COUNT) -
                    (statusFiltersWithCount[a.toUpperCase()] ??
                        DEFAULT_STATUS_COUNT),
            ),
        [statusFiltersWithCount],
    );

    const setStatusFilter = (status: string): void => {
        setFilter(JobFilter.STATUS, status);
    };

    return (
        <div className="flex items-center gap-3 text-sm">
            <Button
                variant={ButtonVariant.GHOST}
                onClick={resetFilters}
                label="All"
                className="text-slate-400 hover:text-white"
                icon={
                    <span className="stat-all ml-1 font-mono font-medium text-white">
                        {statusSum}
                    </span>
                }
            />
            <span className="h-3 w-px shrink-0 bg-white/10" />
            {sortedStatusBadges.map((status) => {
                const upperCasedStatus = status.toUpperCase();
                const selectedStatus =
                    searchParams.get(JobFilter.STATUS) === upperCasedStatus;

                const statusColor =
                    JOB_STATUS_COLORS[
                        upperCasedStatus as keyof typeof JOB_STATUS_COLORS
                    ];
                return (
                    <div className="flex items-center gap-3" key={status}>
                        <Button
                            variant={ButtonVariant.GHOST}
                            onClick={() => {
                                setStatusFilter(upperCasedStatus);
                            }}
                            label={status}
                            className={getClassNames(
                                'text-slate-400 hover:text-white',
                                selectedStatus && 'text-white',
                            )}
                            icon={
                                <span
                                    className={getClassNames(
                                        'stat-all ml-1 font-mono font-medium',
                                        statusColor.color,
                                    )}
                                >
                                    {statusFiltersWithCount[upperCasedStatus] ||
                                        '0'}
                                </span>
                            }
                        />
                        <span className="h-3 w-px shrink-0 bg-white/10" />
                    </div>
                );
            })}
        </div>
    );
};

export { StatusFilterList };
