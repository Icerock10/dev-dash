import { getClassNames } from '~/shared/libs/helpers/helpers';

type Properties = {
    jobInfo: Record<string, string | null>;
};

const JobPreviewSummary: React.FC<Properties> = ({ jobInfo }) => {
    return (
        <div className="grid grid-cols-3 gap-3">
            {Object.entries(jobInfo).map(([label, value]) => (
                <div
                    key={label}
                    className="rounded-xl border border-[#1e2a45] bg-[#0c1020] p-3"
                >
                    <p className="mb-1.5 text-[10px] tracking-wide text-slate-500 uppercase">
                        {label}
                    </p>
                    <p
                        className={getClassNames(
                            'text-sm font-medium',
                            label === 'SALARY'
                                ? 'text-emerald-400'
                                : 'text-white',
                        )}
                    >
                        {value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export { JobPreviewSummary };
