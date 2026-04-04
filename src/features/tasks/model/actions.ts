'use server';

import {
    type TaskUpdateDto,
    type TaskCreateDto,
} from '~/entities/task/index.js';
import { taskService } from '~/entities/task/api/task';
import { checkAuthAndGetUserId } from '~/shared/libs/helpers/helpers';
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

export { deleteTask, updateTask, createTask };
