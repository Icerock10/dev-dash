import { JobsScreen } from '~/screens/jobs/index';
import { jobService } from '~/entities/job/index';

async function Jobs() {
    const jobs = await jobService.getAll();
    return <JobsScreen jobs={jobs} />;
}

export default Jobs;
