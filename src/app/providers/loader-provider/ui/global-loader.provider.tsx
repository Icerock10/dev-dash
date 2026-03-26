'use client';

import { createContext, useState } from '~/shared/hooks/hooks';
import { type LoadingContextType } from '../libs/types/types';

const LoadingContext = createContext<LoadingContextType | null>(null);

const GlobalLoaderProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = (): void => {
        setIsLoading(true);
    };

    const stopLoading = (): void => {
        setIsLoading(false);
    };

    return (
        <LoadingContext.Provider
            value={{ isLoading, startLoading, stopLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export { GlobalLoaderProvider, LoadingContext };
