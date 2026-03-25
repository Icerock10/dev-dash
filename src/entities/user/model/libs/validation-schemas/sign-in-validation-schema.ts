import { type z } from 'zod';

import { registerValidationSchema } from './user-register-validation-schema';

const signInValidationSchema = registerValidationSchema.pick({
    email: true,
    password: true,
});

type SignInDto = z.infer<typeof signInValidationSchema>;

export { signInValidationSchema, type SignInDto };
