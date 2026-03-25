import { z } from 'zod';
import {
    UserValidationMessage,
    UserValidationRule,
    UserValidationRegexRule,
} from '../enums/enums';

const registerValidationSchema = z.object({
    email: z
        .string()
        .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
            message: UserValidationMessage.FIELD_REQUIRED,
        })
        .regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
            message: UserValidationMessage.EMAIL_INVALID,
        }),
    name: z
        .string()
        .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
            message: UserValidationMessage.FIELD_REQUIRED,
        })
        .min(UserValidationRule.NAME_MIN_LENGTH, {
            message: UserValidationMessage.NAME_LENGTH,
        })
        .max(UserValidationRule.NAME_MAX_LENGTH, {
            message: UserValidationMessage.NAME_LENGTH,
        }),
    password: z.string().trim().min(UserValidationRule.PASSWORD_MIN_LENGTH, {
        message: UserValidationMessage.PASSWORD_INVALID,
    }),
});

type RegisterDto = z.infer<typeof registerValidationSchema>;

export { registerValidationSchema, type RegisterDto };
