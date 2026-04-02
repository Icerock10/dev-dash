import { type JobDto } from '~/entities/job/index';

type SearchParams = {
    status?: JobDto['status'];
    tags?: string[];
    completed?: string;
    jobId?: string;
};

export { type SearchParams };
