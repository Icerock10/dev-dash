import { type JobDto } from '~/entities/job/index';
import { PipelineJobRow } from './pipeline-job-row';
import { getFirstElements } from '../../model/libs/helpers/helpers';

type Properties = {
    jobs: JobDto[];
};

const PipeLineJobList: React.FC<Properties> = ({ jobs }) => {
    const recentJobs = getFirstElements(jobs);
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-white/5">
            {recentJobs.map((job) => (
                <PipelineJobRow job={job} key={job.id} />
            ))}
        </div>
    );
};

export { PipeLineJobList };
