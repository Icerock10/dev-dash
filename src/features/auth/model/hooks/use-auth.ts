'use client';

import { AppRoute, DefaultErrorMessage } from '../../libs/enums/enums';
import { useCallback, useLoading } from '~/shared/hooks/hooks';
import { useRouter } from 'next/navigation';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { notification } from '~/shared/libs/modules/notification/notification';

type Payload<T> = {
    authAction: (payload: T) => Promise<unknown>;
    redirectTo?: string;
};

type UseAuthReturn<T> = {
    handleAuthAction: (payload: T) => Promise<void>;
};

const useAuth = <T>({
    authAction,
    redirectTo,
}: Payload<T>): UseAuthReturn<T> => {
    const router = useRouter();
    const { startLoading, stopLoading } = useLoading();

    const handleAuthAction = useCallback(
        async (payload: T): Promise<void> => {
            startLoading();
            try {
                await authAction(payload);
                router.push(redirectTo ?? AppRoute.ROOT);
            } catch (_error) {
                if (_error instanceof HTTPError) {
                    notification.error(_error.message);
                    return;
                }
                notification.error(DefaultErrorMessage.INTERNAL_ERROR);
            } finally {
                stopLoading();
            }
        },
        [authAction, router, redirectTo, startLoading, stopLoading],
    );

    return { handleAuthAction };
};

export { useAuth };
