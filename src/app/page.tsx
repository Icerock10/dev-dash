import { OverviewPage } from '~/widgets/index';
import { getServerSession } from 'next-auth';

async function Page() {
    const session = await getServerSession();
    const userName = session?.user.name ?? 'Guest';

    return <OverviewPage userName={userName} />;
}

export default Page;
