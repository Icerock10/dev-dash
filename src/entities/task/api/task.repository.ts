import { type PrismaClient } from '~/shared/libs/types/types';
import {
    type TaskCreateDto,
    type TaskUpdateDto,
} from '../model/validation-schemas/validation-schemas';
import {
    type TaskDto,
    type TaskGetAllFilters,
    type JobWithTasksDto,
} from '../model/libs/types/types';

type Constructor = {
    database: PrismaClient;
};

class TaskRepository {
    private readonly database: PrismaClient;
    public constructor({ database }: Constructor) {
        this.database = database;
    }

    public getAllWithTasks(
        userId: string,
        filters: TaskGetAllFilters = {},
    ): Promise<JobWithTasksDto[]> {
        const { completed, jobId } = filters;

        return this.database.job.findMany({
            where: {
                userId,
                ...(jobId && { id: jobId }),
            },
            include: {
                tasks: {
                    where: {
                        ...(completed !== undefined && { completed }),
                    },
                },
            },
        });
    }

    public create(payload: TaskCreateDto): Promise<TaskDto> {
        const { jobId, ...rest } = payload;

        return this.database.task.create({
            data: {
                ...rest,
                job: { connect: { id: jobId } },
            },
        });
    }

    public update(id: string, payload: TaskUpdateDto): Promise<TaskDto> {
        const { jobId, ...rest } = payload;

        return this.database.task.update({
            where: { id },
            data: {
                ...rest,
                ...(jobId && { job: { connect: { id: jobId } } }),
            },
        });
    }

    public findById(id: string): Promise<TaskDto | null> {
        return this.database.task.findUnique({ where: { id } });
    }

    public async delete(id: string): Promise<TaskDto | null> {
        try {
            const deleted = await this.database.task.delete({
                where: { id },
            });
            return deleted;
        } catch {
            return null;
        }
    }
}

export { TaskRepository };
