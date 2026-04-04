import { type JobDto } from '~/entities/job/index';
import { getClassNames, normalizeStatus } from '~/shared/libs/helpers/helpers';
import { CompanyLogo, JOB_STATUS_COLORS } from '~/entities/job/index';

type Properties = {
    job: JobDto;
};

const PipelineJobRow: React.FC<Properties> = ({ job }) => {
    const statusColor = JOB_STATUS_COLORS[job.status];
    return (
        <div className="job-row flex items-center gap-3 border-b border-white/4 px-3 py-2.5 last:border-b-0">
            <CompanyLogo jobCompanyName={job.company} />
            <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">
                    {job.company}
                </div>
                <div className="truncate text-xs text-slate-500">
                    {job.title}
                </div>
            </div>
            <span
                className={getClassNames(
                    'h-1.5 w-1.5 rounded-full',
                    statusColor.bg,
                )}
            />
            <span
                className={getClassNames(
                    'font-mono text-xs',
                    statusColor.color,
                )}
            >
                {normalizeStatus(job.status)}
            </span>
        </div>
    );
};

export { PipelineJobRow };
