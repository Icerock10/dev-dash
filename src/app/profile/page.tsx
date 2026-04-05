import { ProfilePage } from './ui/profile-page';
import { userService } from '~/entities/user/api/user';
import { getServerSession } from 'next-auth';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

async function Page() {
    const session = await getServerSession();

    if (!session?.user.email) {
        throw HTTPError.notFound();
    }
    const user = await userService.findByEmail(session.user.email);

    if (!user) {
        throw HTTPError.notFound();
    }

    return <ProfilePage user={user} />;
}

export default Page;
