import { type User } from '~/libs/types/types';

type UserResponseDto = Omit<User, 'password'>;
type UserSignInRequestDto = Pick<User, 'email' | 'password'>;
type UserSignUpRequestDto = Pick<User, 'email' | 'password' | 'name'>;

export {
    type UserResponseDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
};
