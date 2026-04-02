import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { useState } from '~/shared/hooks/hooks';
import { ToggleIcon } from '~/shared/ui/icons/icons';
import { type JobWithTasksDto } from '~/entities/task/index';
import { CompanyLogo } from '~/entities/job/index';
import { TaskFilter } from '../model/index';

const DEFAULT_SELECT_ITEM_LABEL = 'All Jobs';

type Properties = {
    jobsWithActiveTasks: JobWithTasksDto[];
    setFilter: (key: string, value: string) => void;
    selectedJobId: string | null;
};

const JobSelectItem: React.FC<Properties> = ({
    jobsWithActiveTasks,
    setFilter,
    selectedJobId,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectItemLabel =
        jobsWithActiveTasks.find((job) => job.id === selectedJobId)?.company ??
        DEFAULT_SELECT_ITEM_LABEL;

    const toggleJobSelectMenu = (): void => {
        setIsOpen((previous) => !previous);
    };

    const onSelectItem = (job?: JobWithTasksDto): void => {
        toggleJobSelectMenu();
        setFilter(TaskFilter.JOB_ID, job?.id ?? '');
    };

    return (
        <div className="relative">
            <Button
                variant={ButtonVariant.SECONDARY}
                className="px-3 py-1.5! font-mono text-xs"
                label={selectItemLabel}
                icon={<ToggleIcon className="h-3 w-3" />}
                onClick={toggleJobSelectMenu}
            />
            {isOpen && (
                <div className="absolute top-full right-0 z-20 mt-1.5 min-w-45 rounded-xl border border-[#1e2a45] bg-[#111827] p-1.5">
                    <div
                        role="button"
                        onClick={() => {
                            onSelectItem();
                        }}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/4 hover:text-white"
                    >
                        All Jobs
                    </div>
                    {jobsWithActiveTasks.map((job) => {
                        return (
                            <div
                                role="button"
                                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/4 hover:text-white"
                                key={job.id}
                                onClick={() => {
                                    onSelectItem(job);
                                }}
                            >
                                <CompanyLogo
                                    variant="shrink"
                                    jobCompanyName={job.company}
                                />
                                <div>{job.company}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export { JobSelectItem };
