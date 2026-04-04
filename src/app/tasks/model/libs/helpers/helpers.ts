import { type JobWithTasksDto } from '~/entities/task/index';
import { type SelectOption } from '~/shared/libs/types/types';

const getUniqueCompanyOptions = (
    allJobsWithTasks: JobWithTasksDto[],
): SelectOption[] => {
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
