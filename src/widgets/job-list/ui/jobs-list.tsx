import { useCallback, useState } from '~/shared/hooks/hooks';
import { type JobDto } from '~/entities/job/index';
import { JobCard } from '../../job-card/index';

const JobsList: React.FC<{ jobs: JobDto[] }> = ({ jobs }) => {
    const [openJobId, setOpenJobId] = useState<string | null>(null);

    const onOpen = useCallback((payload: null | string) => {
        setOpenJobId(payload);
    }, []);

    return (
        <div className="xs:grid-cols-1 grid gap-3 p-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    openJobId={openJobId}
                    onOpen={onOpen}
                />
            ))}
        </div>
    );
};

export { JobsList };
