import { type JobDto } from '~/entities/job/index';
import { PipelineJobRow } from './pipeline-job-row';

const JOBS_START_INDEX = 0;
const JOBS_END_INDEX = 5;

type Properties = {
    jobs: JobDto[];
};

const PipeLineJobList: React.FC<Properties> = ({ jobs }) => {
    const getRecentFiveJobs = jobs.slice(JOBS_START_INDEX, JOBS_END_INDEX);
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-white/5">
            {getRecentFiveJobs.map((job) => (
                <PipelineJobRow job={job} key={job.id} />
            ))}
        </div>
    );
};

export { PipeLineJobList };
