import { JobsScreen } from '~/screens/jobs/index';
import { jobService } from '~/entities/job/index';

async function Jobs() {
    const jobs = await jobService.getAll();
    const rawFilters = await jobService.getStatusAndTags();
    return <JobsScreen jobs={jobs} rawFilters={rawFilters} />;
}

export default Jobs;
