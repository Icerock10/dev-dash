import { JobsPage } from './ui/jobs-page';
import { jobService } from '~/entities/job/index';
import { type SearchParams } from '~/shared/libs/types/types';

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const { tags, status } = params;

    const jobs = await jobService.getAll({ tags, status });
    const rawFilters = await jobService.getStatusAndTags();

    return <JobsPage jobs={jobs} rawFilters={rawFilters} />;
}

export default Page;
