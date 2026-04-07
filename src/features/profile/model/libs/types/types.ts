import { type Control, type FieldErrors } from 'react-hook-form';
import { type UserDto } from '~/entities/user/model/libs/types/types';

type UpdateProfileFormContext = {
    control: Control<UserDto>;
    errors: FieldErrors<UserDto>;
};

export { type UpdateProfileFormContext };
