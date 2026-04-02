import { type JobWithTasksDto } from '~/entities/task/index';
import {
    getCompletedTasksCount,
    getTasksProgress,
} from '~/widgets/task-list/model/libs/helpers/helpers';

type Properties = {
    jobWithTasks: JobWithTasksDto[];
};

const TasksFilter: React.FC<Properties> = ({ jobWithTasks }) => {
    const tasks = jobWithTasks.flatMap((job) => job.tasks);
    const completedTasks = getCompletedTasksCount(tasks);
    const tasksProgress = getTasksProgress(completedTasks, tasks.length);

    return (
        <div className="flex items-center gap-6 border-b border-white/6 px-6 py-3">
            <div className="flex flex-1 items-center gap-3">
                <div className="max-w-xs flex-1">
                    <div className="mb-1.5 flex justify-between">
                        <span className="font-mono text-[11px] text-slate-500">
                            Progress
                        </span>
                        <span
                            className="font-mono text-[11px] text-slate-400"
                            id="progress-label"
                        >
                            {completedTasks} / {tasks.length}
                        </span>
                    </div>
                    <div className="h-1 flex-1 rounded-md bg-[#1e2a45]">
                        <div
                            className="h-full rounded-md bg-[#2563eb] transition-[width] duration-300"
                            style={{ width: `${tasksProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TasksFilter };
