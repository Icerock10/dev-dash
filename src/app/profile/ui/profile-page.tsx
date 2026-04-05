import { Header } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { UpdateProfileForm } from '~/features/profile/update/ui/update-profile-form';
import { type UserDto } from '~/entities/user/model/libs/types/types';

type Properties = {
    user: UserDto;
};

const ProfilePage: React.FC<Properties> = ({ user }) => {
    return (
        <div className="flex-1">
            <Header
                title="Profile"
                subTitle="Manage your personal info and preferences"
            >
                <div className="flex h-8 w-54 gap-3 font-sans">
                    <Button label="Discard" variant={ButtonVariant.SECONDARY} />
                    <Button className="text-white" label="Save changes" />
                </div>
            </Header>
            <div className="mx-auto flex max-w-2xl flex-col gap-5 p-6">
                <UpdateProfileForm user={user} />
            </div>
        </div>
    );
};

export { ProfilePage };
