import { useLoading, useAppForm, useCallback } from '~/shared/hooks/hooks';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { updateProfile } from '~/features/profile/model/action';
import { type Control, type FieldErrors } from 'react-hook-form';
import { notification } from '~/shared/libs/modules/notification/notification';

type Payload = {
    user: Partial<UserDto>;
};

type UseProfileReturn = {
    control: Control<UserDto>;
    errors: FieldErrors<UserDto>;
    onSaveProfile: () => void;
    onFormReset: () => void;
};

const useProfile = ({ user }: Payload): UseProfileReturn => {
    const { startLoading, stopLoading } = useLoading();
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

    const onFormReset = (): void => {
        reset();
    };

    const onSaveProfile = useCallback(() => {
        void handleProfileUpdate();
    }, [handleProfileUpdate]);

    return { onSaveProfile, control, errors, onFormReset };
};

export { useProfile };
