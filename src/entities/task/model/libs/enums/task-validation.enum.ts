const TaskValidationRule = {
    JOB_ID_MIN_LENGTH: 1,
    MIN_TITLE_LENGTH: 5,
    MAX_TITLE_LENGTH: 250,
    MAX_DESCRIPTION_LENGTH: 2000,
} as const;

const TaskValidationMessage = {
    JOB_ID_NOT_FOUND: 'Job was not selected',
    TITLE_MIN_LENGTH_NOT_VALID: `Title minimum length should be equal or more than ${String(TaskValidationRule.MIN_TITLE_LENGTH)}`,
    TITLE_MAX_LENGTH_NOT_VALID: `Title maximum length should be not more than ${String(TaskValidationRule.MAX_TITLE_LENGTH)}`,
    DESCRIPTION_MAX_LENGTH_NOT_VALID: `Description length should be not more than ${String(TaskValidationRule.MAX_DESCRIPTION_LENGTH)}`,
} as const;

export { TaskValidationMessage, TaskValidationRule };
