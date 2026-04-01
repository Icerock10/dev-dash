import { type JobDto } from '../model/libs/types/types';
import {
    type PrismaClient,
    type BaseRepository,
} from '~/shared/libs/types/types';
import {
    type JobCreateDto,
    type JobUpdateDto,
} from '../model/libs/validation-schemas/validation-schemas';

type Constructor = {
    database: PrismaClient;
};

class JobRepository implements Pick<
    BaseRepository<JobDto, JobCreateDto>,
    'getAll'
> {
    private readonly database: PrismaClient;
    public constructor({ database }: Constructor) {
        this.database = database;
    }
    public create(userId: string, payload: JobCreateDto): Promise<JobDto> {
        return this.database.job.create({ data: { ...payload, userId } });
    }
    public getAll(): Promise<JobDto[]> {
        return this.database.job.findMany();
    }
    public getById(id: string): Promise<JobDto | null> {
        return this.database.job.findUnique({ where: { id } });
    }
    public update(id: string, payload: JobUpdateDto): Promise<JobDto> {
        return this.database.job.update({
            where: { id },
            data: payload,
        });
    }
    public async delete(id: string): Promise<JobDto | null> {
        try {
            const deleted = await this.database.job.delete({
                where: { id },
            });
            return deleted;
        } catch {
            return null;
        }
    }
    public async getStatusAndTags(): Promise<
        {
            tags: JobDto['tags'];
            status: JobDto['status'];
        }[]
    > {
        return this.database.job.findMany({
            select: { tags: true, status: true },
        });
    }
}

export { JobRepository };
