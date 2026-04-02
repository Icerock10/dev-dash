import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import { type TaskRepository } from './task.repository';
import {
    type TaskCreateDto,
    type TaskUpdateDto,
} from '../model/validation-schemas/validation-schemas';
import {
    type TaskDto,
    type TaskGetAllFilters,
} from '../model/libs/types/types';
import { type JobService } from '~/entities/job/api/job.service';

type Constructor = {
    taskRepository: TaskRepository;
    jobService: JobService;
};

class TaskService {
    private readonly taskRepository: TaskRepository;
    private readonly jobService: JobService;

    public constructor({ taskRepository, jobService }: Constructor) {
        this.taskRepository = taskRepository;
        this.jobService = jobService;
    }

    public getAll(
        userId: string,
        filters: TaskGetAllFilters,
    ): Promise<TaskDto[]> {
        return this.taskRepository.getAll(userId, filters);
    }

    public async checkOwnership(jobId: string, userId: string): Promise<void> {
        const job = await this.jobService.getById(jobId);
        if (!job) {
            throw HTTPError.notFound();
        }

        if (job.userId !== userId) {
            throw HTTPError.unauthorized();
        }
    }

    public async create(
        userId: string,
        payload: TaskCreateDto,
    ): Promise<TaskDto> {
        await this.checkOwnership(payload.jobId, userId);
        return this.taskRepository.create(payload);
    }

    public async update(
        id: string,
        userId: string,
        payload: TaskUpdateDto,
    ): Promise<TaskDto> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw HTTPError.notFound();
        }

        if (!payload.jobId) {
            throw HTTPError.badRequest();
        }

        await this.checkOwnership(payload.jobId, userId);

        return this.taskRepository.update(id, payload);
    }

    public async delete(id: string, userId: string): Promise<TaskDto> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw HTTPError.notFound();
        }

        await this.checkOwnership(task.jobId, userId);

        const deleted = await this.taskRepository.delete(id);

        if (!deleted) {
            throw HTTPError.internalError();
        }

        return deleted;
    }
}

export { TaskService };
