import { StatusFilterList } from './status-filter-list';
import { TagFilters } from './tag-filters';
import { type JobFilters as TJobFilters } from '~/entities/job/index';
import { useJobFilters } from './use-job-filters';

type Properties = {
    rawFilters: TJobFilters[];
};

const JobFilters: React.FC<Properties> = ({ rawFilters }) => {
    const {
        searchParams,
        tagFilters,
        setFilter,
        statusFiltersWithCount,
        resetFilters,
        statusSum,
    } = useJobFilters({
        rawFilters,
    });
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/6 px-6 py-3">
            <StatusFilterList
                setFilter={setFilter}
                resetFilters={resetFilters}
                statusFiltersWithCount={statusFiltersWithCount}
                statusSum={statusSum}
                searchParams={searchParams}
            />
            <TagFilters
                searchParams={searchParams}
                tagFilters={tagFilters}
                setFilter={setFilter}
            />
        </div>
    );
};

export { JobFilters };
