import { Avatar, Input } from '~/shared/ui/components/components';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { type UpdateProfileFormContext } from '../../model/libs/types/types';

type Properties = {
    user: UserDto;
} & UpdateProfileFormContext;

const UpdateProfileForm: React.FC<Properties> = ({ user, control, errors }) => {
    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <div className="mb-5 flex items-center gap-4">
                <Avatar variant="secondary" user={user} />
            </div>
            <form className="grid gap-x-5 font-sans md:grid-cols-2">
                <Input
                    label="Full Name"
                    name="name"
                    control={control}
                    errors={errors}
                    placeholder="Your name"
                />
                <Input
                    label="Email"
                    name="email"
                    control={control}
                    errors={errors}
                    placeholder="you@example.com"
                />
                <Input
                    label="Role / Title"
                    name="title"
                    control={control}
                    errors={errors}
                    placeholder="e.g. Frontend Engineer"
                />
                <Input
                    label="Location"
                    name="location"
                    control={control}
                    errors={errors}
                    placeholder="e.g. Berlin, Germany"
                />
            </form>
        </div>
    );
};

export { UpdateProfileForm };
