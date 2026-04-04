import { TasksPage } from './ui/tasks-page';
import { taskService } from '~/entities/task/api/task';
import { type SearchParams } from '~/shared/libs/types/types';
import {
    parseBooleanParam,
    checkAuthAndGetUserId,
} from '~/shared/libs/helpers/helpers';

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const { completed, jobId } = params;

    const userId = await checkAuthAndGetUserId();

    const [jobsWithTasks, allJobsWithTasks] = await Promise.all([
        taskService.getAllWithTasks(userId, {
            completed: parseBooleanParam(completed),
            jobId,
        }),
        taskService.getAllWithTasks(userId, {}),
    ]);

    return (
        <TasksPage
            jobsWithTasks={jobsWithTasks}
            allJobsWithTasks={allJobsWithTasks}
        />
    );
}

export default Page;
