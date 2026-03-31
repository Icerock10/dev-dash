const JobValidationRegexRule = {
    VALID_SALARY_RANGE: new RegExp(/^([1-4]?\d{1,2}|300)-([1-4]?\d{1,2}|300)$/),
    VALID_TAGS: new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 ,]*$/),
} as const;

export { JobValidationRegexRule };
