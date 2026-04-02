import { useSearchParams, useRouter } from 'next/navigation.js';
import { useCallback, useMemo } from '~/shared/hooks/hooks';
import { TaskFilter } from '../model/index';
import { AppRoute } from '~/shared/libs/enums/enums';
import { type JobWithTasksDto } from '~/entities/task/index';
import {
    getCompletedTasksCount,
    getTasksProgress,
} from '~/widgets/task-list/model/libs/helpers/helpers';

const MIN_TASKS_LENGTH = 0;

type UseTaskFilterReturn = {
    setFilter: (key: string, value: string) => void;
    searchParams: URLSearchParams;
    tasksProgress: string;
    completedTasks: number;
    tasksLength: number;
    jobsWithActiveTasks: JobWithTasksDto[];
    selectedJobId: string | null;
};

type Payload = { allJobsWithTasks: JobWithTasksDto[] };

const useTaskFilter = ({ allJobsWithTasks }: Payload): UseTaskFilterReturn => {
    const { tasks, jobsWithActiveTasks } = useMemo(
        () => ({
            tasks: allJobsWithTasks.flatMap((job) => job.tasks),
            jobsWithActiveTasks: allJobsWithTasks.filter(
                (job) => job.tasks.length > MIN_TASKS_LENGTH,
            ),
        }),
        [allJobsWithTasks],
    );

    const completedTasks = getCompletedTasksCount(tasks);
    const tasksProgress = getTasksProgress(completedTasks, tasks.length);

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedJobId = searchParams.get(TaskFilter.JOB_ID);

    const setFilter = useCallback(
        (key: string, value: string): void => {
            const params = new URLSearchParams(searchParams.toString());

            if (!value) {
                router.push(AppRoute.TASKS);
                return;
            }

            if (params.get(key) === value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
            router.push(`${AppRoute.TASKS}?${params}`);
        },
        [router, searchParams],
    );
    return {
        setFilter,
        searchParams,
        tasksProgress,
        completedTasks,
        tasksLength: tasks.length,
        jobsWithActiveTasks,
        selectedJobId,
    };
};

export { useTaskFilter };
