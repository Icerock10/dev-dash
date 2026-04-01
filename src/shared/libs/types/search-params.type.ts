import { type JobDto } from '~/entities/job/index';

type SearchParams = {
    status?: JobDto['status'];
    tags?: string[];
};

export { type SearchParams };
