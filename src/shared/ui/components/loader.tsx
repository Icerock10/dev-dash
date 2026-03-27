import { useLoading } from '~/shared/hooks/hooks';
import { LoaderVariant } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';

type Properties = {
    variant: ValueOf<typeof LoaderVariant>;
};

const Loader: React.FC<Properties> = ({ variant }) => {
    const { isLoading } = useLoading();

    switch (variant) {
        case LoaderVariant.FULL: {
            if (!isLoading) {
                return null;
            }
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
                </div>
            );
        }

        case LoaderVariant.INLINE: {
            return (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white text-center" />
            );
        }
    }
};

export { Loader };
