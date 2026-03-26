'use client';

import { AppRoute, DefaultErrorMessage } from '../../libs/enums/enums';
import { type SignInDto, type RegisterDto } from '~/entities/user/index';
import { useState } from '~/shared/hooks/hooks';
import { useRouter } from 'next/navigation';
import { actions as authActions } from '../../actions/actions';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

type UseRegisterReturn = {
    onRegister: (payload: RegisterDto) => Promise<void>;
    onLogin: (payload: SignInDto) => Promise<void>;
    isLoading: boolean;
    error: string | null;
};

const useAuth = (): UseRegisterReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onLogin = async (payload: SignInDto): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await authActions.login(payload);
            router.push(AppRoute.ROOT);
        } catch (error) {
            setError(
                error instanceof HTTPError
                    ? error.message
                    : DefaultErrorMessage.INTERNAL_ERROR,
            );
        } finally {
            setIsLoading(false);
        }
    };

    const onRegister = async (payload: RegisterDto): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await authActions.register(payload);
            router.push(AppRoute.ROOT);
        } catch (error) {
            setError(
                error instanceof HTTPError
                    ? error.message
                    : DefaultErrorMessage.INTERNAL_ERROR,
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { onLogin, onRegister, isLoading, error };
};

export { useAuth };
