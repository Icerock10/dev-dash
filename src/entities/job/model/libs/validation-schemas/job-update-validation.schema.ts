import { type z } from 'zod';
import { jobValidationSchema } from './job-create-validation.schema';

const jobUpdateValidationSchema = jobValidationSchema.partial();

type JobUpdateDto = z.infer<typeof jobUpdateValidationSchema>;

export { jobUpdateValidationSchema, type JobUpdateDto };
