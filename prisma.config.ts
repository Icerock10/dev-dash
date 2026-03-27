import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: 'src/shared/libs/modules/prisma/schema/',
    migrations: {
        path: 'src/shared/libs/modules/prisma/migrations',
        seed: 'tsx src/shared/libs/modules/prisma/seeds/seed.ts',
    },
    datasource: {
        url: process.env['DATABASE_URL'] as string,
    },
});
