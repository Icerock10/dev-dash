import { JobsPage } from './ui/jobs-page';
import { jobService } from '~/entities/job/api/job';
import { type SearchParams } from '~/shared/libs/types/types';
import { checkAuthAndGetUserId } from '~/shared/libs/helpers/helpers';

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const { tags, status } = params;
    const userId = await checkAuthAndGetUserId();

    const jobs = await jobService.getAll({ tags, status, userId });
    const rawFilters = await jobService.getStatusAndTags(userId);

    return <JobsPage jobs={jobs} rawFilters={rawFilters} />;
}

export default Page;
