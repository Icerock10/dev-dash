import { PrismaClient } from '~/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '~/shared/libs/modules/config/config';

const adapter = new PrismaPg({
    connectionString: config.ENV.DB.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma =
    globalForPrisma.prisma ??
    (globalForPrisma.prisma = new PrismaClient({ adapter }));

export { prisma };
