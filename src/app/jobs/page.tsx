import { JobsScreen } from '~/screens/jobs/index';
import { jobService } from '~/entities/job/index';
import { type SearchParams } from '~/shared/libs/types/types';

async function Jobs({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const { tags, status } = params;

    const jobs = await jobService.getAll({ tags, status });
    const rawFilters = await jobService.getStatusAndTags();

    return <JobsScreen jobs={jobs} rawFilters={rawFilters} />;
}

export default Jobs;
