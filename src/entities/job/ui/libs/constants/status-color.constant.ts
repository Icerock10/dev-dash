import { JobStatus } from '~/shared/libs/enums/enums';

const JOB_STATUS_COLORS = {
    [JobStatus.NEW]: {
        color: 'text-slate-400',
        bg: 'bg-slate-400',
    },
    [JobStatus.APPLIED]: {
        color: 'text-purple-400',
        bg: 'bg-purple-400',
    },
    [JobStatus.SAVED]: {
        color: 'text-blue-400',
        bg: 'bg-blue-400',
    },
    [JobStatus.INTERVIEW]: {
        color: 'text-emerald-400',
        bg: 'bg-emerald-400',
    },
    [JobStatus.OFFER]: {
        color: 'text-green-400',
        bg: 'bg-green-400',
    },
    [JobStatus.REJECTED]: {
        color: 'text-red-400',
        bg: 'bg-red-400',
    },
} as const;

export { JOB_STATUS_COLORS };
