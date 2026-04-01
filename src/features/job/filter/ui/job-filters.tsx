import { Button } from '~/shared/ui/components/components';
import { ButtonVariant, AppRoute } from '~/shared/libs/enums/enums';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from '~/shared/hooks/hooks';
import {
    formatAndGetStatusBadges,
    JOB_STATUS_COLORS,
    type JobFilters as TJobFilters,
} from '~/entities/job/index';

const DEFAULT_STATUS_COUNT = 0;

const JobFilter = {
    TAGS: 'tags',
    STATUS: 'status',
} as const;

const getStatusFiltersWithCount = (
    filters: TJobFilters[],
): Record<string, number> => {
    const STATUS_OFFSET = 1;
    const statusFiltersWithCount: Record<string, number> = {};

    for (const job of filters) {
        statusFiltersWithCount[job.status] =
            (statusFiltersWithCount[job.status] || DEFAULT_STATUS_COUNT) +
            STATUS_OFFSET;
    }
    return statusFiltersWithCount;
};

const getStatusSum = (
    statusFiltersWithCount: Record<TJobFilters['status'], number>,
): number => {
    return Object.values(statusFiltersWithCount).reduce(
        (prev, status) => prev + status,
        DEFAULT_STATUS_COUNT,
    );
};

const getJobTagFilters = (filters: TJobFilters[]): string[] => {
    const MAX_TAGS_LENGTH = 6;
    return [...new Set(filters.flatMap((job) => job.tags))].filter(
        (_, index) => index < MAX_TAGS_LENGTH,
    );
};

type Properties = {
    rawFilters: TJobFilters[];
};

const JobFilters: React.FC<Properties> = ({ rawFilters }) => {
    const statusBadges = formatAndGetStatusBadges();

    const getStatusCountAndTags = useMemo(() => {
        return {
            statusFiltersWithCount: getStatusFiltersWithCount(rawFilters),
            tagFilters: getJobTagFilters(rawFilters),
        };
    }, [rawFilters]);

    const { statusFiltersWithCount, tagFilters } = getStatusCountAndTags;
    const statusSum = getStatusSum(statusFiltersWithCount);

    const router = useRouter();
    const searchParams = useSearchParams();

    const resetFilters = (): void => {
        router.push(AppRoute.JOBS);
    };

    const setFilter = (key: string, value: string): void => {
        const params = new URLSearchParams(searchParams.toString());

        const existing = params.getAll(key);

        const hasValue = existing.includes(value);

        if (key === JobFilter.STATUS) {
            if (params.get(JobFilter.STATUS) === value) {
                params.delete(JobFilter.STATUS);
            } else {
                params.set('status', value);
            }
        } else {
            const nextValues = hasValue
                ? existing.filter((existingValue) => existingValue !== value)
                : [...existing, value];

            params.delete(key);

            for (const nextValue of nextValues) {
                params.append(key, nextValue);
            }
        }
        router.push(`${AppRoute.JOBS}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-between gap-4 border-b border-white/6 px-6 py-3">
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
                {statusBadges
                    .toSorted(
                        (a, b) =>
                            (statusFiltersWithCount[b.toUpperCase()] ??
                                DEFAULT_STATUS_COUNT) -
                            (statusFiltersWithCount[a.toUpperCase()] ??
                                DEFAULT_STATUS_COUNT),
                    )
                    .map((status) => {
                        const statusColor =
                            JOB_STATUS_COLORS[
                                status.toUpperCase() as keyof typeof JOB_STATUS_COLORS
                            ];
                        return (
                            <div
                                className="flex items-center gap-3"
                                key={status}
                            >
                                <Button
                                    variant={ButtonVariant.GHOST}
                                    onClick={() => {
                                        setFilter(
                                            JobFilter.STATUS,
                                            status.toUpperCase(),
                                        );
                                    }}
                                    label={status}
                                    className="text-slate-400 hover:text-white"
                                    icon={
                                        <span
                                            className={`stat-all ml-1 font-mono font-medium ${statusColor.color}`}
                                        >
                                            {statusFiltersWithCount[
                                                status.toUpperCase()
                                            ] || '0'}
                                        </span>
                                    }
                                />
                                <span className="h-3 w-px shrink-0 bg-white/10" />
                            </div>
                        );
                    })}
            </div>
            <div className="flex gap-3">
                {tagFilters.map((tag) => {
                    const selectedTags = searchParams
                        .getAll(JobFilter.TAGS)
                        .includes(tag);
                    return (
                        <Button
                            onClick={() => {
                                setFilter(JobFilter.TAGS, tag);
                            }}
                            variant={ButtonVariant.TAG}
                            key={tag}
                            label={tag}
                            className={
                                selectedTags
                                    ? 'border-[#3b82f6] bg-[#1e3a5f] text-blue-400!'
                                    : ''
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { JobFilters };
