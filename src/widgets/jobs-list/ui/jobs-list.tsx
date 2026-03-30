import { JobCard } from '~/entities/job/ui/job-card';
import { jobService } from '~/entities/job/index';

const JobsList: React.FC = async () => {
    const jobs = await jobService.getAll();
    return (
        <div className="xs:grid-cols-1 grid gap-3 p-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export { JobsList };
