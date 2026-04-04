import { type JobWithTasksDto } from '~/entities/task/index';

const findCompanyById = (jobs: JobWithTasksDto[], taskJobId: string): string =>
    jobs.find((job) => job.id === taskJobId)?.company ?? '';

export { findCompanyById };
