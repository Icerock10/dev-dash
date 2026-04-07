import { ProfilePage } from './ui/profile-page';
import { userService } from '~/entities/user/api/user';
import { getServerSession } from 'next-auth';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { taskService } from '../../entities/task/api/task';

async function Page() {
    const session = await getServerSession();

    if (!session?.user.email) {
        throw HTTPError.notFound();
    }
    const user = await userService.findByEmail(session.user.email);

    if (!user) {
        throw HTTPError.notFound();
    }
    const jobsWithTasks = await taskService.getAllWithTasks(user.id, {});

    return <ProfilePage user={user} jobs={jobsWithTasks} />;
}

export default Page;
