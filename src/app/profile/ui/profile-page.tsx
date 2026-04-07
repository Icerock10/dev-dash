'use client';

import { Header } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { useProfile } from './use-profile';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import {
    UpdateProfileForm,
    JobStatusSection,
} from '~/features/profile/update/index';
import { type UserDto } from '~/entities/user/model/libs/types/types';

type Properties = {
    user: Partial<UserDto>;
};

const ProfilePage: React.FC<Properties> = ({ user }) => {
    const { control, errors, onSaveProfile, onFormReset, handleStatusUpdate } =
        useProfile({
            user,
        });

    return (
        <div className="flex-1 font-sans">
            <Header
                title="Profile"
                subTitle="Manage your personal info and preferences"
            >
                <div className="flex h-8 w-54 gap-3 font-sans">
                    <Button
                        label="Discard"
                        onClick={onFormReset}
                        variant={ButtonVariant.SECONDARY}
                    />
                    <Button
                        className="text-white"
                        label="Save changes"
                        onClick={onSaveProfile}
                    />
                </div>
            </Header>
            <div className="mx-auto flex max-w-2xl flex-col gap-5 p-6">
                <UpdateProfileForm
                    control={control}
                    errors={errors}
                    user={user as UserDto}
                />
                <JobStatusSection
                    userJobSearchStatus={user.jobSearchStatus}
                    handleStatusUpdate={handleStatusUpdate}
                />
            </div>
        </div>
    );
};

export { ProfilePage };
