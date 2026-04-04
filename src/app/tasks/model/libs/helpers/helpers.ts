import { type JobWithTasksDto } from '~/entities/task/index';

const getUniqueCompanyOptions = (
    allJobsWithTasks: JobWithTasksDto[],
): {
    label: string;
    value: string;
}[] => {
    const getUniqueJobsWithTasks = [
        ...new Map(
            allJobsWithTasks
                .filter((job) => job.company)
                .map((job) => [`${job.company} — ${job.title}`, job.id]),
        ),
    ];

    return getUniqueJobsWithTasks.map(([company, jobId]) => ({
        label: company,
        value: jobId,
    }));
};

export { getUniqueCompanyOptions };
