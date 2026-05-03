'use server';

import { userService } from '~/entities/user/api/user';
import { checkAuthAndGetUserId } from '~/shared/libs/helpers/helpers';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { revalidatePath } from 'next/cache';
import { AppRoute } from '~/shared/libs/enums/enums';

const updateProfile = async (payload: Partial<UserDto>): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await userService.updateUser(userId, payload);
    revalidatePath(AppRoute.ROOT);
};

const addUserSkill = async (skill: string): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await userService.addSkill(userId, skill);
    revalidatePath(AppRoute.ROOT);
};
const removeUserSkill = async (skill: string): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await userService.removeSkill(userId, skill);
    revalidatePath(AppRoute.ROOT);
};

const deleteProfile = async (): Promise<void> => {
    const userId = await checkAuthAndGetUserId();
    await userService.deleteUser(userId);
};

export { updateProfile, addUserSkill, removeUserSkill, deleteProfile };
