import { JobTagVariant, JobTag, type JobDto } from '~/entities/job/index';

type Properties = {
    job: JobDto;
};

const JobCardBody: React.FC<Properties> = ({ job }) => {
    return (
        <>
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
        </>
    );
};

export { JobCardBody };
