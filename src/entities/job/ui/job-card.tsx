import { type JobDto } from '../model/libs/types/types';
import { getCompanyColor } from './libs/helpers/helpers';
import { useCallback } from '~/shared/hooks/hooks';
import { JobTagVariant, JobTag } from './job-tag';
import { firstCharUpperCase } from '~/shared/libs/helpers/helpers';

import { JobCardStatus } from '~/features/job/index';

type Properties = {
    job: JobDto;
    openJobId: string | null;
    onOpen: (payload: null | string) => void;
};

const JobCard: React.FC<Properties> = ({ job, openJobId, onOpen }) => {
    const companyColor = getCompanyColor(job.company);
    const companyInitial = firstCharUpperCase(job.company);
    const recruiterInitial = job.recruiterName
        ? firstCharUpperCase(job.recruiterName)
        : '?';
    const isOpen = openJobId === job.id;

    const onJobStatusToggle = useCallback(() => {
        onOpen(isOpen ? null : job.id);
    }, [isOpen, job.id, onOpen]);

    return (
        <div className="cursor-pointer rounded-xl border border-white/6 bg-[#161b27] p-4 hover:bg-[#1c2235]">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${companyColor.bg} text-sm font-semibold ${companyColor.text}`}
                    >
                        {companyInitial}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">
                            {job.company}
                        </div>
                        <div className="text-[11px] text-slate-500">
                            {job.location}
                        </div>
                    </div>
                </div>
                <JobCardStatus
                    jobStatus={job.status}
                    isOpen={isOpen}
                    onJobStatusToggle={onJobStatusToggle}
                    jobId={job.id}
                />
            </div>
            <div className="mb-1 text-[15px] leading-snug font-medium text-white">
                {job.title}
            </div>
            <div className="mt-2 mb-3 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                    <JobTag key={tag} label={tag} />
                ))}
                {job.salaryRange && (
                    <JobTag
                        label={job.salaryRange}
                        variant={JobTagVariant.SALARY}
                    />
                )}
            </div>
            <div className="flex items-center justify-between border-t border-white/6 pt-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[9px] font-medium text-white">
                        {recruiterInitial}
                    </div>
                    <span className="text-[11px] text-slate-500">
                        {job.recruiterName}
                    </span>
                </div>
                <span className="text-[11px] text-slate-600">
                    View details →
                </span>
            </div>
        </div>
    );
};

export { JobCard };
