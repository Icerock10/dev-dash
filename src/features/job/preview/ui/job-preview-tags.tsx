import { JobTag } from '~/entities/job/index';

type Properties = {
    tags: string[];
};

const JobPreviewTags: React.FC<Properties> = ({ tags }) => {
    return (
        <div>
            <h1 className="mb-2.5 text-xs tracking-wide text-slate-500 uppercase">
                Tags
            </h1>
            <div className="mt-2 mb-3 flex flex-wrap gap-1.5 font-mono">
                {tags.map((tag) => (
                    <JobTag key={tag} label={tag} />
                ))}
            </div>
        </div>
    );
};

export { JobPreviewTags };
