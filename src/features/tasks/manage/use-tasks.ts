import { deleteTask, updateTask, createTask } from '../model/actions';
import {
    useLoading,
    useAppForm,
    useMemo,
    useEffect,
} from '~/shared/hooks/hooks';
import { notification } from '~/shared/libs/modules/notification/notification';
import { type Control, type FieldErrors } from 'react-hook-form';

import {
    type TaskUpdateDto,
    taskCreateValidationSchema,
    type TaskCreateDto,
    type TaskDto,
} from '~/entities/task/index';

type UseTasksPayload = {
    onTaskFormClose?: () => void;
    task?: TaskDto | null;
};

type UseTasksReturn = {
    onTaskDelete: (taskId: string) => Promise<void>;
    onTaskUpdate: (taskId: string, payload: TaskUpdateDto) => Promise<void>;
    control: Control<TaskCreateDto>;
    errors: FieldErrors<TaskCreateDto>;
    onSubmit: (event: React.BaseSyntheticEvent) => Promise<void>;
};

const useTasks = ({
    task,
    onTaskFormClose,
}: UseTasksPayload): UseTasksReturn => {
    const { startLoading, stopLoading } = useLoading();

    const DefaultTaskValues = useMemo(
        () => ({
            jobId: task?.jobId ?? '',
            title: task?.title ?? '',
            completed: task?.completed ?? false,
            description: task?.description ?? '',
            dueDate: task?.dueDate ?? '',
        }),
        [task],
    );

    const { control, errors, handleSubmit, reset } = useAppForm<TaskCreateDto>({
        defaultValues: DefaultTaskValues,
        validationSchema: taskCreateValidationSchema,
    });

    useEffect(() => {
        reset(DefaultTaskValues);
    }, [reset, DefaultTaskValues]);

    const handleTaskAction = async <T>(
        taskAction: (payload: T) => Promise<void>,
        payload: T,
    ): Promise<void> => {
        try {
            startLoading();
            await taskAction(payload);
        } catch (error) {
            notification.error((error as Record<'message', string>).message);
        } finally {
            stopLoading();
        }
    };

    const onTaskDelete = async (taskId: string): Promise<void> => {
        await handleTaskAction(deleteTask, taskId);
    };

    const onTaskCreate = async (payload: TaskCreateDto): Promise<void> => {
        await handleTaskAction(createTask, payload);
    };

    const onTaskUpdate = async (
        taskId: string,
        payload: TaskUpdateDto,
    ): Promise<void> => {
        await handleTaskAction(
            (taskUpdatePayload: { taskId: string; payload: TaskUpdateDto }) =>
                updateTask(taskUpdatePayload.taskId, taskUpdatePayload.payload),
            { taskId, payload },
        );
    };

    const onSubmit = handleSubmit(async (data) => {
        await (task ? onTaskUpdate(task.id, data) : onTaskCreate(data));
        if (typeof onTaskFormClose === 'function') {
            onTaskFormClose();
        }
    });

    return {
        onTaskDelete,
        onTaskUpdate,
        control,
        errors,
        onSubmit,
    };
};

export { useTasks };
