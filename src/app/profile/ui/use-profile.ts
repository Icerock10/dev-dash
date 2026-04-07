import { useLoading, useAppForm, useCallback } from '~/shared/hooks/hooks';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { updateProfile } from '~/features/profile/model/action';
import { type UpdateProfileFormContext } from '~/features/profile/model/libs/types/types';
import { notification } from '~/shared/libs/modules/notification/notification';
import { useSession } from 'next-auth/react';

type Payload = {
    user: Partial<UserDto>;
};

type UseProfileReturn = {
    onSaveProfile: () => void;
    onFormReset: () => void;
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
            skills: user.skills ?? [''],
            github: user.github ?? '',
            linkedin: user.linkedin ?? '',
            portfolio: user.portfolio ?? '',
        },
    });

    const handleProfileUpdate = handleSubmit(async (data) => {
        try {
            startLoading();
            await updateProfile(data);
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    });
    const handleStatusUpdate = async (payload: {
        jobSearchStatus: UserDto['jobSearchStatus'];
    }): Promise<void> => {
        try {
            startLoading();
            await updateProfile(payload);
            await update();
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const onFormReset = (): void => {
        reset();
    };

    const onSaveProfile = useCallback(() => {
        void handleProfileUpdate();
    }, [handleProfileUpdate]);

    return { onSaveProfile, control, errors, onFormReset, handleStatusUpdate };
};

export { useProfile };
