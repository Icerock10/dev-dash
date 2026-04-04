'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/auth-options';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

const checkAuthAndGetUserId = async (): Promise<string> => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
        throw HTTPError.unauthorized();
    }
    return userId;
};

export { checkAuthAndGetUserId };
