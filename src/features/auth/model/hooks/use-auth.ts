import { type UserSignUpRequestDto } from '../../libs/types/types';
import { AppRoute, DefaultErrorMessage } from '../../libs/enums/enums';
import { useState } from '~/shared/hooks/hooks';
import { useRouter } from 'next/navigation';
import {
    login as loginAction,
    register as registerAction,
} from '../../actions/actions';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

type UseRegisterReturn = {
    onRegister: (payload: UserSignUpRequestDto) => Promise<void>;
    onLogin: (payload: UserSignUpRequestDto) => Promise<void>;
    isLoading: boolean;
    error: string | null;
};

const useAuth = (): UseRegisterReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onLogin = async (payload: UserSignUpRequestDto): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await loginAction(payload.email, payload.password);
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

    const onRegister = async (payload: UserSignUpRequestDto): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await registerAction(payload);
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
