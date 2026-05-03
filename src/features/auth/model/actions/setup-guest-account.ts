'use server';
import { userSeed } from '~/shared/libs/modules/prisma/seeds/add-user-seeds';
import { jobSeed } from '~/shared/libs/modules/prisma/seeds/add-job-seeds';
import { taskSeed } from '~/shared/libs/modules/prisma/seeds/add-task-seeds';
import { type UserSignInRequestDto } from '~/entities/user/model/libs/types/types';

const setupGuestAccount = async (): Promise<UserSignInRequestDto> => {
    const user = await userSeed();
    const jobs = await jobSeed(user.id);
    await taskSeed(jobs);
    return { email: user.email, password: 'guest123123' };
};

export { setupGuestAccount };
