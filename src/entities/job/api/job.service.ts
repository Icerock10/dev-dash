import { type JobDto } from '../model/libs/types/types';
import {
    type JobCreateDto,
    type JobUpdateDto,
} from '../model/libs/validation-schemas/validation-schemas';
import { type BaseService } from '~/shared/libs/types/types';
import { type JobRepository } from './job.repository';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

type Constructor = {
    jobRepository: JobRepository;
};

class JobService implements Pick<BaseService<JobDto, unknown>, 'getAll'> {
    private readonly jobRepository: JobRepository;
    public constructor({ jobRepository }: Constructor) {
        this.jobRepository = jobRepository;
    }
    public create(userId: string, payload: JobCreateDto): Promise<JobDto> {
        return this.jobRepository.create(userId, payload);
    }
    public getAll(): Promise<JobDto[]> {
        return this.jobRepository.getAll();
    }
    public async getById(id: string): Promise<JobDto | null> {
        const foundJob = await this.jobRepository.getById(id);
        if (!foundJob) {
            throw HTTPError.notFound();
        }
        return foundJob;
    }
    public async update(id: string, payload: JobUpdateDto): Promise<void> {
        try {
            await this.jobRepository.update(id, payload);
        } catch {
            throw HTTPError.badRequest();
        }
    }
    public async delete(id: string): Promise<JobDto | null> {
        const deletedJob = await this.jobRepository.delete(id);
        if (!deletedJob) {
            throw HTTPError.notFound();
        }
        return deletedJob;
    }
    public async getStatusAndTags(): Promise<
        {
            tags: JobDto['tags'];
            status: JobDto['status'];
        }[]
    > {
        return this.jobRepository.getStatusAndTags();
    }
}

export { JobService };
