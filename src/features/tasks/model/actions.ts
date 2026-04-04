'use server';

import {
    type TaskUpdateDto,
    type TaskCreateDto,
} from '~/entities/task/index.js';
import { taskService } from '~/entities/task/api/task';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/auth-options';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { AppRoute } from '~/shared/libs/enums/enums';
import { revalidatePath } from 'next/cache';

const updateTask = async (
    taskId: string,
    payload: TaskUpdateDto,
): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await taskService.update(taskId, userId, payload);
    revalidatePath(AppRoute.TASKS);
};

const deleteTask = async (taskId: string): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await taskService.delete(taskId, userId);
    revalidatePath(AppRoute.TASKS);
};

const createTask = async (payload: TaskCreateDto): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await taskService.create(userId, payload);
    revalidatePath(AppRoute.TASKS);
};

const checkAuthAndGetUserId = async (): Promise<string> => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
        throw HTTPError.unauthorized();
    }
    return userId;
};

export { deleteTask, updateTask, createTask };
