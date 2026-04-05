import { Avatar } from '~/shared/ui/components/components';
import { type Session } from '~/shared/libs/types/types';

type Properties = {
    user: Session['user'];
};

const UpdateProfileForm: React.FC<Properties> = ({ user }) => {
    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <div className="mb-5 flex items-center gap-4">
                <Avatar variant="secondary" user={user} />
            </div>
        </div>
    );
};

export { UpdateProfileForm };
