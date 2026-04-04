import { OverviewPage } from '~/widgets/index';
import { getServerSession } from 'next-auth';
import { taskService } from '../entities/task/api/task';
import { authOptions } from './api/auth/[...nextauth]/auth-options';

async function Page() {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ?? '';
    const userName = session?.user.name ?? 'Guest';

    const jobs = await taskService.getAllWithTasks(userId, {});

    return <OverviewPage userName={userName} jobs={jobs} />;
}

export default Page;
