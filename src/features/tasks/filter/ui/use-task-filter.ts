import { useSearchParams, useRouter } from 'next/navigation.js';
import { useCallback, useMemo } from '~/shared/hooks/hooks';
import { AppRoute } from '~/shared/libs/enums/enums';
import { type JobWithTasksDto } from '~/entities/task/index';
import {
    getCompletedTasksCount,
    getTasksProgress,
} from '~/widgets/task-list/model/libs/helpers/helpers';

const DEFAULT_FILTER_TAG = 'reset';

type UseTaskFilterReturn = {
    setFilter: (key: string, value: string) => void;
    searchParams: URLSearchParams;
    tasksProgress: string;
    completedTasks: number;
    tasksLength: number;
};

type Payload = { jobWithTasks: JobWithTasksDto[] };

const useTaskFilter = ({ jobWithTasks }: Payload): UseTaskFilterReturn => {
    const tasks = useMemo(
        () => jobWithTasks.flatMap((job) => job.tasks),
        [jobWithTasks],
    );

    const completedTasks = getCompletedTasksCount(tasks);
    const tasksProgress = getTasksProgress(completedTasks, tasks.length);

    const router = useRouter();
    const searchParams = useSearchParams();

    const setFilter = useCallback(
        (key: string, value: string): void => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === DEFAULT_FILTER_TAG) {
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
    };
};

export { useTaskFilter };
