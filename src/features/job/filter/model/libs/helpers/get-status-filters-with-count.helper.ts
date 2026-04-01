import { type JobFilters as TJobFilters } from '~/entities/job/index';
import { DEFAULT_STATUS_COUNT } from '../constants/constants';

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

export { getStatusFiltersWithCount };
