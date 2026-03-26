import { config } from 'dotenv';
import {
    EnvironmentValidationSchema,
    type EnvironmentSchemaType,
} from './libs/validation-schemas/validation-schemas';

class BaseConfig {
    public ENV!: EnvironmentSchemaType;

    private get envSchema(): EnvironmentSchemaType {
        return {
            APP: {
                NODE_ENV: process.env.NODE_ENV,
                NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
            },
            DB: {
                DATABASE_URL: process.env.DATABASE_URL as string,
            },
        };
    }
    constructor() {
        config();
        const parsed = EnvironmentValidationSchema.safeParse(this.envSchema);

        if (!parsed.success) {
            const issues = parsed.error.issues
                .map((issue) => `- ${issue.path.join('. ')}: ${issue.message}`)
                .join('\n');

            throw new Error(`❌ Invalid environment variables:\n${issues}`);
        }
        this.ENV = parsed.data;
    }
}

export { BaseConfig };
