import { Input } from '~/shared/ui/components/components';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { type UpdateProfileFormContext } from '../../model/libs/types/types';

type Properties = {
    user?: UserDto;
} & UpdateProfileFormContext;

const UpdateLinksForm: React.FC<Properties> = ({ control, errors }) => {
    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <h2 className="mb-4 text-sm font-medium">Links</h2>
            <form className="grid grid-cols-1 gap-x-5 font-sans">
                <div className="relative">
                    <Input
                        label="GitHub"
                        name="github"
                        control={control}
                        errors={errors}
                        placeholder="https://github.com/username"
                    />
                </div>
                <Input
                    label="LinkedIn"
                    name="linkedin"
                    control={control}
                    errors={errors}
                    placeholder="https://linkedin.com/in/username"
                />
                <Input
                    label="Portfolio"
                    name="portfolio"
                    control={control}
                    errors={errors}
                    placeholder="https://yoursite.dev"
                />
            </form>
        </div>
    );
};

export { UpdateLinksForm };
