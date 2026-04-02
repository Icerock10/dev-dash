import { TasksPage } from './ui/tasks-page';
import { taskService } from '~/entities/task/api/task';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';

async function Page() {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const jobWithTasks = await taskService.getAllWithTasks(String(userId), {});

    return <TasksPage jobWithTasks={jobWithTasks} />;
}

export default Page;
