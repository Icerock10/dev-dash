import { LoaderVariant } from '~/shared/libs/enums/enums';
import { firstCharUpperCase } from '~/shared/libs/helpers/helpers';
import { Loader } from './loader';

type Properties = {
    userName?: string | null;
};

const Avatar: React.FC<Properties> = ({ userName }) => {
    const isLoading = !userName;

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Loader variant={LoaderVariant.INLINE} />
            </div>
        );
    }

    const userInitial = firstCharUpperCase(userName);

    return (
        <div className="flex items-center gap-2.5 border-t border-white/6 px-2 pt-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white">
                {userInitial}
            </div>
            <div className="text-xs leading-tight font-medium text-white">
                <p>{userName}</p>
                <span className="text-[11px] leading-tight text-slate-500">
                    Open to work
                </span>
            </div>
            <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400"></div>
        </div>
    );
};

export { Avatar };
