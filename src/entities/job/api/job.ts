import { JobRepository } from './job.repository';
import { prisma } from '~/shared/libs/modules/prisma/prisma';
import { JobService } from './job.service';

const jobRepository = new JobRepository({ database: prisma });
const jobService = new JobService({ jobRepository });

export { jobService };
