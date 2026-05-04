import { type JobDto } from '../model/libs/types/types';
import { type PrismaClient } from '~/shared/libs/types/types';

import {
    type JobCreateDto,
    type JobUpdateDto,
} from '../model/libs/validation-schemas/validation-schemas';

type Constructor = {
    database: PrismaClient;
};

class JobRepository {
    private readonly database: PrismaClient;
    public constructor({ database }: Constructor) {
        this.database = database;
    }
    public create(userId: string, payload: JobCreateDto): Promise<JobDto> {
        return this.database.job.create({ data: { ...payload, userId } });
    }
    public getAll(
        userId: string,
        tags: JobDto['tags'],
        status?: JobDto['status'],
    ): Promise<JobDto[]> {
        const DEFAULT_TAGS_LENGTH = 0;

        return this.database.job.findMany({
            where: {
                userId,
                ...(tags.length > DEFAULT_TAGS_LENGTH && {
                    tags: { hasSome: tags },
                }),
                ...(status && { status }),
            },
        });
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
    public async getStatusAndTags(
        userId: string,
    ): Promise<Pick<JobDto, 'tags' | 'status'>[]> {
        return this.database.job.findMany({
            where: {
                userId,
            },
            select: { tags: true, status: true },
        });
    }
}

export { JobRepository };
