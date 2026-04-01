import { AppRoute } from '~/shared/libs/enums/enums';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useCallback } from '~/shared/hooks/hooks';
import { JobFilter } from '../model/libs/enums/enums';
import { type JobFilters as TJobFilters } from '~/entities/job/index';
import {
    getJobTagFilters,
    getStatusSum,
    getStatusFiltersWithCount,
} from '../model/libs/helpers/helpers';

type UseJobFiltersReturn = {
    statusFiltersWithCount: Record<string, number>;
    tagFilters: string[];
    statusSum: number;
    resetFilters: () => void;
    setFilter: (key: string, value: string) => void;
    searchParams: URLSearchParams;
};

type Payload = {
    rawFilters: TJobFilters[];
};

const useJobFilters = ({ rawFilters }: Payload): UseJobFiltersReturn => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getStatusCountAndTags = useMemo(() => {
        return {
            statusFiltersWithCount: getStatusFiltersWithCount(rawFilters),
            tagFilters: getJobTagFilters(rawFilters),
        };
    }, [rawFilters]);

    const { statusFiltersWithCount, tagFilters } = getStatusCountAndTags;
    const statusSum = getStatusSum(statusFiltersWithCount);

    const resetFilters = useCallback((): void => {
        router.push(AppRoute.JOBS);
    }, [router]);

    const setFilter = useCallback(
        (key: string, value: string): void => {
            const params = new URLSearchParams(searchParams.toString());

            const existing = params.getAll(key);

            const hasValue = existing.includes(value);

            if (key === JobFilter.STATUS) {
                if (params.get(JobFilter.STATUS) === value) {
                    params.delete(JobFilter.STATUS);
                } else {
                    params.set(JobFilter.STATUS, value);
                }
            } else {
                const nextValues = hasValue
                    ? existing.filter(
                          (existingValue) => existingValue !== value,
                      )
                    : [...existing, value];

                params.delete(key);

                for (const nextValue of nextValues) {
                    params.append(key, nextValue);
                }
            }
            router.push(`${AppRoute.JOBS}?${params.toString()}`);
        },
        [router, searchParams],
    );

    return {
        statusFiltersWithCount,
        tagFilters,
        statusSum,
        resetFilters,
        setFilter,
        searchParams,
    };
};

export { useJobFilters };
