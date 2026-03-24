import { type User } from '~/libs/types/types';

type UserResponseDto = Omit<User, 'password'>;
type UserSignInRequestDto = Pick<User, 'email' | 'password'>;
type UserSignUpRequestDto = Pick<User, 'email' | 'password' | 'name'>;

export {
    type UserResponseDto,
    type UserSignUpRequestDto,
    type UserSignInRequestDto,
};
export { type PrismaClient, type User as UserDto } from '~/generated/client';
export { type BaseRepository, type BaseService } from '~/libs/types/types.js';
