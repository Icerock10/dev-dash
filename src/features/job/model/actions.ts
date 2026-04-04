'use server';

import { type JobCreateDto } from '~/entities/job/index';
import { jobService } from '~/entities/job/api/job';
import { AppRoute } from '~/shared/libs/enums/enums';
import { revalidatePath } from 'next/cache';
import { type JobStatus } from '~/shared/libs/enums/enums';
import { checkAuthAndGetUserId } from '~/shared/libs/helpers/helpers';

const createJob = async (job: JobCreateDto): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await jobService.create(userId, job);
    revalidatePath(AppRoute.JOBS);
};

const updateJobStatus = async (
    jobId: string,
    status: keyof typeof JobStatus,
): Promise<void> => {
    await jobService.update(jobId, { status });
    revalidatePath(AppRoute.JOBS);
};

const updateJob = async (
    jobId: string,
    payload: JobCreateDto,
): Promise<void> => {
    await checkAuthAndGetUserId();
    await jobService.update(jobId, payload);
    revalidatePath(AppRoute.JOBS);
};

const deleteJob = async (jobId: string): Promise<void> => {
    await checkAuthAndGetUserId();
    await jobService.delete(jobId);
    revalidatePath(AppRoute.JOBS);
};

export { createJob, deleteJob, updateJobStatus, updateJob };
