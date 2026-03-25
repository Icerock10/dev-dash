import { httpApi } from '~/shared/libs/modules/api/api';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { signIn } from 'next-auth/react';
import { type UserSignUpRequestDto } from '../libs/types/types';
import { AppApiPath, HttpMethod } from '../libs/enums/enums';

const login = async (email: string, password: string): Promise<unknown> => {
    const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
    });

    if (response?.error) {
        throw HTTPError.internalError();
    }

    return response;
};

const register = async (payload: UserSignUpRequestDto): Promise<void> => {
    await registerUser(payload);
    await login(payload.email, payload.password);
};

const registerUser = (payload: UserSignUpRequestDto): Promise<void> => {
    return httpApi.load(AppApiPath.REGISTER, {
        method: HttpMethod.POST,
        data: payload,
    });
};

export { login, register };
