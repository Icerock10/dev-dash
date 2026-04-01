import { type JobDto } from '~/entities/job/index';

const getJobInfo = (job: JobDto): Record<string, string | null> => ({
    LOCATION: job.location,
    SALARY: `€${job.salaryRange ?? ''}k`,
    RECRUITER: job.recruiterName,
});

export { getJobInfo };
