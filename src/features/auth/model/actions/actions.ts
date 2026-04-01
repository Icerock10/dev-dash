import { httpApi } from '~/shared/libs/modules/api/api';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { type SignInDto, type RegisterDto } from '~/entities/user/index';
import { signIn } from 'next-auth/react';
import { AppApiPath, HttpMethod } from '../libs/enums/enums';

const login = async (payload: SignInDto): Promise<unknown> => {
    const response = await signIn('credentials', {
        ...payload,
        redirect: false,
    });

    if (response?.error) {
        throw HTTPError.unauthorized(response.error);
    }

    return response;
};

const register = async (payload: RegisterDto): Promise<void> => {
    await httpApi.load<RegisterDto>(AppApiPath.REGISTER, {
        method: HttpMethod.POST,
        data: payload,
    });

    await login(payload);
};

const actions = {
    register,
    login,
};

export { actions };
