import { type ValueOf } from '~/shared/libs/types/types';

const JobTagVariant = {
    DEFAULT: 'default',
    SALARY: 'salary',
} as const;

type Properties = {
    label: string;
    variant?: ValueOf<typeof JobTagVariant>;
};

const JOB_TAG_STYLES = {
    [JobTagVariant.DEFAULT]: 'bg-white/5 text-slate-400 border-white/6',
    [JobTagVariant.SALARY]:
        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const JobTag: React.FC<Properties> = ({
    label,
    variant = JobTagVariant.DEFAULT,
}) => {
    return (
        <span
            className={`rounded-md border px-2 py-0.5 text-[10px] ${JOB_TAG_STYLES[variant]}`}
        >
            {label}
        </span>
    );
};

export { JobTag };

export { JobTagVariant };
