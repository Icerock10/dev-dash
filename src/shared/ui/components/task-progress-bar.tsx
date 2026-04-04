import { getTasksProgress } from '~/widgets/task-list/model/libs/helpers/helpers';

type Properties = {
    completedTasksCount: number;
    allTasksCount: number;
};

const TaskProgressBar: React.FC<Properties> = ({
    completedTasksCount,
    allTasksCount,
}) => {
    const taskProgressPercent = getTasksProgress(
        completedTasksCount,
        allTasksCount,
    );

    return (
        <div className="mt-0.5 flex items-center gap-2">
            <div className="h-0.5 max-w-20 flex-1 bg-[#1e2a45]">
                <div
                    className="h-full bg-[#2563eb]"
                    style={{ width: `${taskProgressPercent}%` }}
                ></div>
            </div>
            <span className="font-mono text-[10px] text-slate-600">
                {completedTasksCount}/{allTasksCount}
            </span>
        </div>
    );
};

export { TaskProgressBar };
