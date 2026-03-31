'use server';

import { revalidatePath } from 'next/cache';
import { jobService } from '~/entities/job/index';
import { AppRoute } from '~/shared/libs/enums/enums';
import { type JobStatus } from '../libs/enums/enums';

const updateJobStatus = async (
    jobId: string,
    status: keyof typeof JobStatus,
): Promise<void> => {
    await jobService.update(jobId, { status });
    revalidatePath(AppRoute.JOBS);
};

export { updateJobStatus };
