import { type TaskDto } from '~/entities/task/index';
import { useState, useCallback } from '~/shared/hooks/hooks';

type UseTaskModalReturn = {
    editingTask: TaskDto | undefined | null;
    isFormOpen: boolean;
    closeTaskForm: () => void;
    openCreateTaskForm: () => void;
    openEditTaskForm: (task: TaskDto | null) => void;
};

const useTaskModal = (): UseTaskModalReturn => {
    const [editingTask, setEditingTask] = useState<
        TaskDto | undefined | null
    >();
    const isFormOpen = editingTask !== undefined;

    const closeTaskForm = useCallback(() => {
        setEditingTask(undefined);
    }, []);

    const openCreateTaskForm = useCallback(() => {
        setEditingTask(null);
    }, []);

    const openEditTaskForm = useCallback((task: TaskDto | null) => {
        setEditingTask(task);
    }, []);

    return {
        editingTask,
        isFormOpen,
        closeTaskForm,
        openCreateTaskForm,
        openEditTaskForm,
    };
};

export { useTaskModal };
