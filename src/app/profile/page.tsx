import { ProfilePage } from './ui/profile-page';
import { userService } from '~/entities/user/api/user';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { taskService } from '../../entities/task/api/task';
import { AppRoute } from '~/shared/libs/enums/enums';

async function Page() {
    const session = await getServerSession();

    if (!session?.user.email) {
        redirect(AppRoute.AUTH);
    }
    const user = await userService.findByEmail(session.user.email);

    if (!user) {
        redirect(AppRoute.AUTH);
    }
    const jobsWithTasks = await taskService.getAllWithTasks(user.id, {});

    return <ProfilePage user={user} jobs={jobsWithTasks} />;
}

export default Page;
