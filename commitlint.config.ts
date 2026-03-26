import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

import { ProjectPrefix } from './project.config.js';

const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    ignores: [(commit) => /^chore(\([^)]+\))?: release/.test(commit)],
    parserPreset: {
        parserOpts: {
            issuePrefixes: ProjectPrefix.ISSUE_PREFIXES.map(
                (prefix) => `${prefix}-`,
            ),
        },
    },
    rules: {
        'references-empty': [RuleConfigSeverity.Error, 'never'],
        'scope-enum': [
            RuleConfigSeverity.Error,
            'always',
            [...ProjectPrefix.SCOPES.APPS, ...ProjectPrefix.SCOPES.PACKAGES],
        ],
    },
};

export default config;
