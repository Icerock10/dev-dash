import { z } from 'zod';
import { TaskValidationRule, TaskValidationMessage } from '../libs/enums/enums';

const taskCreateValidationSchema = z.object({
    jobId: z.string().min(TaskValidationRule.JOB_ID_MIN_LENGTH, {
        message: TaskValidationMessage.JOB_ID_NOT_FOUND,
    }),
    title: z
        .string()
        .min(TaskValidationRule.MIN_TITLE_LENGTH, {
            message: TaskValidationMessage.TITLE_MIN_LENGTH_NOT_VALID,
        })
        .max(TaskValidationRule.MAX_TITLE_LENGTH, {
            message: TaskValidationMessage.TITLE_MAX_LENGTH_NOT_VALID,
        }),
    description: z
        .string()
        .max(TaskValidationRule.MAX_DESCRIPTION_LENGTH, {
            message: TaskValidationMessage.DESCRIPTION_MAX_LENGTH_NOT_VALID,
        })
        .optional(),
    dueDate: z.coerce.date().optional(),
    completed: z.boolean().default(false),
});

type TaskCreateDto = z.infer<typeof taskCreateValidationSchema>;

export { taskCreateValidationSchema, type TaskCreateDto };
