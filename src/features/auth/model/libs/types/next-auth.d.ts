import { type DefaultSession } from 'next-auth';
import { type JobSearchStatus } from '@prisma/client';

declare module 'next-auth' {
    interface User {
        jobSearchStatus: JobSearchStatus;
        title: string | null;
    }
    interface Session {
        user: {
            id: string;
            jobSearchStatus: JobSearchStatus;
            title: string | null;
        } & DefaultSession['user'];
    }
}
