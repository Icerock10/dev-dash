import { type JobFilters as TJobFilters } from '~/entities/job/index';

const getJobTagFilters = (filters: TJobFilters[]): string[] => {
    const MAX_TAGS_LENGTH = 6;
    return [...new Set(filters.flatMap((job) => job.tags))].filter(
        (_, index) => index < MAX_TAGS_LENGTH,
    );
};

export { getJobTagFilters };
