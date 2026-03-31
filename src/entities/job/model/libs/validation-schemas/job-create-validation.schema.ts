import { z } from 'zod';
import {
    JobStatus,
    JobValidationRule,
    JobValidationRegexRule,
    JobValidationMessage,
} from '../enums/enums';

const jobValidationSchema = z.object({
    company: z
        .string()
        .min(JobValidationRule.COMPANY_MIN_LENGTH, {
            message: JobValidationMessage.COMPANY_MIN_LENGTH,
        })
        .max(JobValidationRule.COMPANY_MAX_LENGTH, {
            message: JobValidationMessage.COMPANY_MAX_LENGTH,
        }),
    title: z
        .string()
        .min(JobValidationRule.TITLE_MIN_LENGTH, {
            message: JobValidationMessage.TITLE_MIN_LENGTH,
        })
        .max(JobValidationRule.TITLE_MAX_LENGTH, {
            message: JobValidationMessage.TITLE_MAX_LENGTH,
        }),
    location: z
        .string()
        .max(JobValidationRule.LOCATION_MAX_LENGTH, {
            message: JobValidationMessage.LOCATION_MAX_LENGTH,
        })
        .nullable()
        .optional(),
    salaryRange: z
        .string()
        .regex(JobValidationRegexRule.VALID_SALARY_RANGE, {
            message: JobValidationMessage.SALARY_RANGE_INVALID,
        })
        .nullable()
        .optional(),
    tags: z.preprocess(
        (value) => {
            if (Array.isArray(value)) {
                return value as unknown[];
            }
            if (typeof value === 'string') {
                return value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean);
            }
            return [];
        },
        z
            .string()
            .regex(JobValidationRegexRule.VALID_TAGS, {
                message: JobValidationMessage.TAGS_INVALID,
            })
            .array()
            .default([]),
    ),
    recruiterName: z
        .string()
        .max(JobValidationRule.RECRUITER_NAME_MAX_LENGTH, {
            message: JobValidationMessage.RECRUITER_NAME_MAX_LENGTH,
        })
        .optional(),
    status: z.enum(JobStatus),
    notes: z.string().nullable().optional(),
});

type JobCreateDto = z.infer<typeof jobValidationSchema>;

export { jobValidationSchema, type JobCreateDto };
