import { type z } from 'zod';
import { taskCreateValidationSchema } from './task-create-validation.schema';

const taskUpdateValidationSchema = taskCreateValidationSchema.partial();

type TaskUpdateDto = z.infer<typeof taskUpdateValidationSchema>;

export { taskUpdateValidationSchema, type TaskUpdateDto };
