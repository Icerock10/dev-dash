import { JobStatus } from '~/shared/libs/enums/enums';
import { type JobWithTasksDto } from '~/entities/task/index';

const DEFAULT_APPLIED_COUNT = 0;
const APPLIED_COUNT_PERCENT = 100;

type Payload = {
    jobs: JobWithTasksDto[];
};

type OverviewStatsReturn = {
    totalJobsCount: number;
    jobsInProgressCount: number;
    totalIncompleteTasksCount: number;
    responseRate: number;
    totalTasksCount: number;
    completedTasksCount: number;
    responseCount: number;
    appliedCount: number;
};

const getOverViewStats = ({ jobs }: Payload): OverviewStatsReturn => {
    const totalJobsCount = jobs.length;
    const jobsInProgressCount = jobs.filter(
        (job) =>
            job.status === JobStatus.APPLIED ||
            job.status === JobStatus.INTERVIEW,
    ).length;

    const tasks = jobs.flatMap((job) => job.tasks);

    const totalIncompleteTasksCount = tasks.filter(
        (task) => !task.completed,
    ).length;

    const completedTasksCount = tasks.filter((task) => task.completed).length;
    const totalTasksCount = tasks.length;

    const responseCount = jobs.filter(
        (job) =>
            job.status === JobStatus.INTERVIEW ||
            job.status === JobStatus.OFFER,
    ).length;

    const appliedCount = jobs.filter(
        (job) => job.status === JobStatus.APPLIED,
    ).length;

    const responseRate =
        appliedCount > DEFAULT_APPLIED_COUNT
            ? Math.round((responseCount / appliedCount) * APPLIED_COUNT_PERCENT)
            : DEFAULT_APPLIED_COUNT;

    return {
        totalJobsCount,
        jobsInProgressCount,
        totalIncompleteTasksCount,
        responseRate,
        totalTasksCount,
        completedTasksCount,
        responseCount,
        appliedCount,
    };
};

export { getOverViewStats };
