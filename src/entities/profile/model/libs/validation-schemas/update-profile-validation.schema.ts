import { z } from 'zod';
import { registerValidationSchema } from '~/entities/user/index';
import { UserJobSearchStatus } from '~/shared/libs/enums/enums';
import { UpdateProfileValidationMessage } from '../enums/enums';

const updateProfileSchema = registerValidationSchema
    .pick({ email: true, name: true })
    .extend({
        title: z.string().optional(),
        location: z.string().optional(),
        jobSearchStatus: z.enum(UserJobSearchStatus).optional(),
        github: z
            .url(UpdateProfileValidationMessage.INVALID_URL)
            .optional()
            .or(z.literal('')),
        linkedin: z
            .url(UpdateProfileValidationMessage.INVALID_URL)
            .optional()
            .or(z.literal('')),
        portfolio: z
            .url(UpdateProfileValidationMessage.INVALID_URL)
            .optional()
            .or(z.literal('')),
    });

type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export { type UpdateProfileDto, updateProfileSchema };
