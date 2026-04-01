import { type JobStatus } from '../enums/enums';

type JobFilters = {
    tags: string[];
    status: keyof typeof JobStatus;
};

export { type JobFilters };
