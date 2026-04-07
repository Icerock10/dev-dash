import { LoaderVariant } from '~/shared/libs/enums/enums';
import {
    firstCharUpperCase,
    getClassNames,
} from '~/shared/libs/helpers/helpers';
import { type ValueOf, type Session } from '~/shared/libs/types/types';
import { USER_JOB_STATUS_CONFIG } from '~/features/profile/model/libs/constants/constants';
import { Loader } from './loader';

const AvatarVariant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
} as const;

type Properties = {
    user?: Session['user'];
    variant?: ValueOf<typeof AvatarVariant>;
};

const Avatar: React.FC<Properties> = ({
    user,
    variant = AvatarVariant.PRIMARY,
}) => {
    const isLoading = !user;

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Loader variant={LoaderVariant.INLINE} />
            </div>
        );
    }

    const userInitial = firstCharUpperCase(String(user.name));
    const findUserStatusOptions = USER_JOB_STATUS_CONFIG.find(
        (userJobStatus) => userJobStatus.status === user.jobSearchStatus,
    );

    const normalizedUserJobSearchStatus = (
        user.jobSearchStatus as string
    ).replace('_', ' ');

    if (variant === AvatarVariant.SECONDARY) {
        return (
            <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-linear-to-br from-blue-500/20 to-purple-600/20">
                    <span className="text-xl font-semibold tracking-tight text-white">
                        {userInitial}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[16px] leading-tight font-semibold text-white">
                        {user.name}
                    </p>
                    <p className="text-sm text-slate-500">{user.title}</p>
                    <div className="mt-1 flex items-center gap-3">
                        <div
                            className={getClassNames(
                                'h-1.5 w-1.5 rounded-full',
                                findUserStatusOptions?.itemStyles.bg,
                            )}
                        />
                        <span className="font-mono text-[11px] text-slate-400 lowercase first-letter:uppercase">
                            {normalizedUserJobSearchStatus}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2.5 border-t border-white/6 px-2 pt-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white">
                {userInitial}
            </div>
            <div className="text-xs leading-tight font-medium text-white">
                <p>{user.name}</p>
                <p className="text-[11px] text-slate-500 lowercase first-letter:uppercase">
                    {normalizedUserJobSearchStatus}
                </p>
            </div>
            <div
                className={getClassNames(
                    'ml-auto h-2 w-2 rounded-full',
                    findUserStatusOptions?.itemStyles.bg,
                )}
            />
        </div>
    );
};

export { Avatar };
