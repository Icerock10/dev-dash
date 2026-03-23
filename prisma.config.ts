import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: 'src/libs/modules/prisma/schema/',
    migrations: {
        path: 'src/libs/modules/prisma/migrations',
    },
    datasource: {
        url: process.env['DATABASE_URL'] as string,
    },
});
