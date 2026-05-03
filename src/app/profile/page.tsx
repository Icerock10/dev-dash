import { ProfilePage } from './ui/profile-page';
import { userService } from '~/entities/user/api/user';
import { getServerSession } from 'next-auth';
import { taskService } from '../../entities/task/api/task';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';
import { HTTPError } from '../../shared/libs/modules/exceptions/exceptions';

async function Page() {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
        throw HTTPError.notFound();
    }
    const user = await userService.findById(session.user.id);

    if (!user) {
        throw HTTPError.notFound();
    }
    const jobsWithTasks = await taskService.getAllWithTasks(user.id, {});

    return <ProfilePage user={user} jobs={jobsWithTasks} />;
}

export default Page;
