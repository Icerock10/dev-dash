import { type TaskDto } from '~/entities/task/index';
import { Button } from '~/shared/ui/components/components';
import {
    OverDueIcon,
    EditIcon,
    DeleteIcon,
    CompletedIcon,
} from '~/shared/ui/icons/icons';
import { getClassNames } from '~/shared/libs/helpers/helpers';
import { isOverdue } from '../model/libs/helpers/helpers';

type Properties = {
    task: TaskDto;
};

const TaskItem: React.FC<Properties> = ({ task }) => {
    const shouldOverdueRender = isOverdue(task.dueDate);

    const taskTitleClasses = getClassNames(
        'task-title text-sm leading-snug font-medium',
        task.completed && 'line-through text-slate-400',
    );

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
                />
            </div>
        </div>
    );
};

export { TaskItem };
