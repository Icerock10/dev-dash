import { TasksPage } from './ui/tasks-page';
import { taskService } from '~/entities/task/api/task';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';
import { type SearchParams } from '~/shared/libs/types/types';
import { parseBooleanParam } from '../../shared/libs/helpers/helpers';

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const { completed, jobId } = params;
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    const jobWithTasks = await taskService.getAllWithTasks(String(userId), {
        completed: parseBooleanParam(completed),
        jobId,
    });

    return <TasksPage jobWithTasks={jobWithTasks} />;
}

export default Page;
