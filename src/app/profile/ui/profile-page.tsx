'use client';

import { Header } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { useProfile } from './use-profile';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { ActivityOverview } from '~/entities/profile/ui/activity-overview';
import {
    UpdateProfileForm,
    JobStatusSection,
    SkillsSection,
    UpdateLinksForm,
    DangerZone,
} from '~/features/profile/update/index';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { type JobWithTasksDto } from '~/entities/task/index';

type Properties = {
    user: Partial<UserDto>;
    jobs: JobWithTasksDto[];
};

const ProfilePage: React.FC<Properties> = ({ user, jobs }) => {
    const {
        control,
        errors,
        onSaveProfile,
        onFormReset,
        handleStatusUpdate,
        handleAddSkill,
        handleRemoveSkill,
        handleProfileDelete,
    } = useProfile({
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
                <SkillsSection
                    handleAddSkill={handleAddSkill}
                    handleRemoveSkill={handleRemoveSkill}
                    userSkills={user.skills}
                />
                <UpdateLinksForm control={control} errors={errors} />
                <ActivityOverview jobs={jobs} />
                <DangerZone handleProfileDelete={handleProfileDelete} />
            </div>
        </div>
    );
};

export { ProfilePage };
