import { userSeed } from './add-user-seeds';
import { jobSeed } from './add-job-seeds';
import { taskSeed } from './add-task-seeds';
import { prisma } from '../prisma';

const runSeeds = async (): Promise<void> => {
    try {
        const user = await userSeed();
        const jobs = await jobSeed(user.id);
        await taskSeed(jobs);
    } catch {
        throw new Error('Error while loading seeds...');
    } finally {
        await prisma.$disconnect();
    }
};

await runSeeds();
