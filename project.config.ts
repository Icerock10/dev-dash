const ProjectPrefix = {
    APP: 'dd',
    CHANGE_TYPES: [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
    ],
    ENVIRONMENT: 'production',
    ISSUE_PREFIXES: ['dd', 'release'],
    SCOPES: {
        APPS: ['web'],
        PACKAGES: ['main'],
    },
} as const;

export { ProjectPrefix };
