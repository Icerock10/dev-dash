import { type JobFilters as TJobFilters } from '~/entities/job/index';
import { DEFAULT_STATUS_COUNT } from '../constants/constants';

const getStatusSum = (
    statusFiltersWithCount: Record<TJobFilters['status'], number>,
): number => {
    return Object.values(statusFiltersWithCount).reduce(
        (prev, status) => prev + status,
        DEFAULT_STATUS_COUNT,
    );
};

export { getStatusSum };
