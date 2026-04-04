import { type TaskDto } from '~/entities/task/index';
import { isOverdue } from '~/widgets/task-list/model/libs/helpers/helpers';

type Properties = {
    task: TaskDto;
    companyName: string;
};

const PipelineTaskItem: React.FC<Properties> = ({ task, companyName }) => {
    const shouldRenderOverdue = isOverdue(task.dueDate);
    return (
        <div className="flex items-start gap-2.5 rounded-lg px-2 py-2.5 hover:bg-[#1c2235]">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D9E75]" />
            <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] leading-snug text-white">
                    {task.title}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-600">
                    {companyName}
                </div>
            </div>
            {shouldRenderOverdue && (
                <span className="mt-0.5 font-mono text-[11px] text-red-400">
                    Overdue
                </span>
            )}
        </div>
    );
};

export { PipelineTaskItem };
