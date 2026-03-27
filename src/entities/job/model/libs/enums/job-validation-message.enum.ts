import { JobValidationRule } from './job-validation-rule.enum';

const JobValidationMessage = {
    COMPANY_MIN_LENGTH: `Company name must be at least ${String(JobValidationRule.COMPANY_MIN_LENGTH)} characters`,
    COMPANY_MAX_LENGTH: `Company name must be at most ${String(JobValidationRule.COMPANY_MAX_LENGTH)} characters`,
    TITLE_MIN_LENGTH: `Title must be at least ${String(JobValidationRule.TITLE_MIN_LENGTH)} characters`,
    TITLE_MAX_LENGTH: `Title must be at most ${String(JobValidationRule.TITLE_MAX_LENGTH)} characters`,
    LOCATION_MAX_LENGTH: `Location must be at most ${String(JobValidationRule.LOCATION_MAX_LENGTH)} characters`,
    RECRUITER_NAME_MAX_LENGTH: `Recruiter name must be at most ${String(JobValidationRule.RECRUITER_NAME_MAX_LENGTH)} characters`,
    SALARY_RANGE_INVALID: 'Salary range must be in format 0-500 (e.g. 80-100)',
    TAGS_INVALID: 'Tag can only contain letters, numbers and: + # . -',
} as const;

export { JobValidationMessage };
