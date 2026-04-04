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
    dueDate: z
        .string()
        .min(
            TaskValidationRule.MIN_DUE_DATE_LENGTH,
            TaskValidationMessage.DUE_DATE_REQUIRED,
        )
        .refine(
            (value) => new Date(value) >= new Date(new Date().toDateString()),
            TaskValidationMessage.DUE_DATE_INVALID,
        ),
    completed: z.boolean().default(false),
});

type TaskCreateDto = z.infer<typeof taskCreateValidationSchema>;

export { taskCreateValidationSchema, type TaskCreateDto };
