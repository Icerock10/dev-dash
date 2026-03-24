import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
    CURRENT_PASSWORD_INVALID: 'Current password is incorrect',
    CURRENT_PASSWORD_REQUIRED:
        'Current password is required to change password',
    EMAIL_ALREADY_EXISTS: 'Email already in use',
    EMAIL_INVALID: 'Invalid email format',
    FIELD_REQUIRED: 'Field is required',
    LINK_HAS_EXPIRED: 'Link has expired',
    NAME_LENGTH: `Name must have at least ${String(UserValidationRule.NAME_MIN_LENGTH)} characters and maximum of ${String(UserValidationRule.NAME_MAX_LENGTH)} characters`,
    PASSWORD_INVALID: `Password should contain between ${String(UserValidationRule.PASSWORD_MIN_LENGTH)} to ${String(UserValidationRule.PASSWORD_MAX_LENGTH)} characters, at least one lowercase letter, one uppercase letter and one digit`,
} as const;

export { UserValidationMessage };
