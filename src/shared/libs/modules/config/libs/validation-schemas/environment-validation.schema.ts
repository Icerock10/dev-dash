import { z } from 'zod';

const NodeEnvironment = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
} as const;

const EnvironmentValidationSchema = z.object({
    APP: z.object({
        NODE_ENV: z.enum(NodeEnvironment),
        NEXTAUTH_SECRET: z.string(),
        NEXTAUTH_URL: z.string(),
    }),

    DB: z.object({
        DATABASE_URL: z.string(),
    }),
});

type EnvironmentSchemaType = z.infer<typeof EnvironmentValidationSchema>;

export { EnvironmentValidationSchema, type EnvironmentSchemaType };
