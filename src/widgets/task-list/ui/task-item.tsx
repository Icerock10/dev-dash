import { type TaskDto, type TaskUpdateDto } from '~/entities/task/index';
import { Button } from '~/shared/ui/components/components';
import {
    OverDueIcon,
    EditIcon,
    DeleteIcon,
    CompletedIcon,
} from '~/shared/ui/icons/icons';
import { getClassNames } from '~/shared/libs/helpers/helpers';
import { isOverdue } from '../model/libs/helpers/helpers';
import { useTasks } from '~/features/tasks/manage/use-tasks';

type Properties = {
    task: TaskDto;
    onEditTask: (task: TaskDto | null) => void;
};

const TaskItem: React.FC<Properties> = ({ task, onEditTask }) => {
    const shouldOverdueRender = isOverdue(task.dueDate);
    const { onTaskDelete, onTaskUpdate } = useTasks({});
    const taskTitleClasses = getClassNames(
        'task-title text-sm leading-snug font-medium',
        task.completed && 'line-through text-slate-400',
    );

    const handleTaskDelete = async (): Promise<void> => {
        await onTaskDelete(task.id);
    };
    const handleTaskUpdate = async (payload: TaskUpdateDto): Promise<void> => {
        await onTaskUpdate(task.id, payload);
    };

    const handleEditTask = (): void => {
        onEditTask(task);
    };

    return (
        <div className="flex items-center gap-3 border-t border-white/4 px-4 py-3 hover:bg-[#1c2235]">
            <Button
                isIconOnly
                label=""
                icon={task.completed && <CompletedIcon />}
                className={getClassNames(
                    task.completed && 'bg-[#2563eb]',
                    'h-4 w-4 cursor-pointer rounded-sm border border-[#334155] hover:border-[#3b82f6]',
                )}
                onClick={() => {
                    void handleTaskUpdate({
                        completed: !task.completed,
                        jobId: task.jobId,
                    });
                }}
            />

            <div className="min-w-0 flex-1">
                <h1 className={taskTitleClasses}>{task.title}</h1>
                <p className="mt-0.5 truncate font-mono text-xs text-slate-500">
                    {task.description}
                </p>
            </div>
            {shouldOverdueRender && (
                <div className="flex items-center gap-1.5 font-mono text-red-400">
                    <OverDueIcon className="w-3" />
                    <span className="font-mono text-[11px]">Overdue</span>
                </div>
            )}
            <div className="flex items-center gap-1">
                <Button
                    onClick={handleEditTask}
                    className="h-7 w-7 rounded-md text-slate-600 transition-colors hover:bg-white/6 hover:text-slate-300"
                    label=""
                    isIconOnly
                    icon={<EditIcon className="h-4 w-4" />}
                />
                <Button
                    className="h-7 w-7 rounded-md text-slate-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    label=""
                    isIconOnly
                    icon={<DeleteIcon className="h-4 w-4" />}
                    onClick={() => {
                        void handleTaskDelete();
                    }}
                />
            </div>
        </div>
    );
};

export { TaskItem };
