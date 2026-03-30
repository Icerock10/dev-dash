import { jobService } from '~/entities/job/index';
import { JobsListClient } from './jobs-list-client';

const JobsList: React.FC = async () => {
    const jobs = await jobService.getAll();
    return <JobsListClient jobs={jobs} />;
};

export { JobsList };
