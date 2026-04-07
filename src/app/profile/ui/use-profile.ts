import { useLoading, useAppForm, useCallback } from '~/shared/hooks/hooks';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import {
    updateProfile,
    addUserSkill,
    removeUserSkill,
} from '~/features/profile/model/action';
import { type UpdateProfileFormContext } from '~/features/profile/model/libs/types/types';
import {
    updateProfileSchema,
    updateUserSkillSchema,
} from '~/entities/profile/model/libs/validation-schemas/validation-schemas';
import { notification } from '~/shared/libs/modules/notification/notification';
import { useSession } from 'next-auth/react';

type Payload = {
    user: Partial<UserDto>;
};

type UseProfileReturn = {
    onSaveProfile: () => void;
    onFormReset: () => void;
    handleAddSkill: (skill: string) => Promise<void>;
    handleRemoveSkill: (skill: string) => Promise<void>;
    handleStatusUpdate: (payload: {
        jobSearchStatus: UserDto['jobSearchStatus'];
    }) => Promise<void>;
} & UpdateProfileFormContext;

const useProfile = ({ user }: Payload): UseProfileReturn => {
    const { startLoading, stopLoading } = useLoading();
    const { update } = useSession();
    const { control, errors, handleSubmit, reset } = useAppForm<UserDto>({
        defaultValues: {
            name: user.name ?? '',
            email: user.email ?? '',
            title: user.title ?? '',
            location: user.location ?? '',
            jobSearchStatus: user.jobSearchStatus,
            github: user.github ?? '',
            linkedin: user.linkedin ?? '',
            portfolio: user.portfolio ?? '',
        },
        validationSchema: updateProfileSchema,
    });

    const withLoading = async (
        ...functions: (() => Promise<unknown>)[]
    ): Promise<void> => {
        try {
            startLoading();
            for (const fn of functions) {
                await fn();
            }
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const handleProfileUpdate = handleSubmit(async (data) => {
        await withLoading(() => updateProfile(data));
    });

    const onSaveProfile = useCallback(() => {
        void handleProfileUpdate();
    }, [handleProfileUpdate]);

    const handleStatusUpdate = async (payload: {
        jobSearchStatus: UserDto['jobSearchStatus'];
    }): Promise<void> => {
        await withLoading(
            () => updateProfile(payload),
            () => update(),
        );
        reset();
    };

    const onFormReset = (): void => {
        reset();
    };

    const handleAddSkill = async (skill: string): Promise<void> => {
        const isValid = updateUserSkillSchema.safeParse({ skill });
        if (!isValid.success) {
            const [{ message }] = isValid.error.issues;
            notification.error(message);
            return;
        }
        await withLoading(() => addUserSkill(skill.trim()));
    };

    const handleRemoveSkill = async (skill: string): Promise<void> => {
        await withLoading(() => removeUserSkill(skill.trim()));
    };

    return {
        onSaveProfile,
        control,
        errors,
        onFormReset,
        handleStatusUpdate,
        handleAddSkill,
        handleRemoveSkill,
    };
};

export { useProfile };
