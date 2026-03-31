'use server';

import { type JobCreateDto, jobService } from '~/entities/job/index';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/auth-options';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { AppRoute } from '~/shared/libs/enums/enums';
import { revalidatePath } from 'next/cache';

const createJob = async (job: JobCreateDto): Promise<void> => {
    const data = await getServerSession(authOptions);
    const userId = data?.user.id;
    if (!userId) {
        throw HTTPError.unauthorized();
    }
    await jobService.create(userId, job);
    revalidatePath(AppRoute.JOBS);
};

export { createJob };
