import { UserJobSearchStatus } from '~/shared/libs/enums/enums';

const USER_JOB_STATUS_CONFIG = [
    {
        status: UserJobSearchStatus.OPEN,
        label: 'Actively looking',
        itemStyles: {
            style: 'border-emerald-500/30 bg-emerald-500/10',
            bg: 'bg-emerald-400',
            color: 'text-emerald-400',
        },
    },
    {
        status: UserJobSearchStatus.PASSIVE,
        label: 'Open to offers',
        itemStyles: {
            style: 'border-amber-500/30 bg-amber-500/10',
            bg: 'bg-amber-400',
            color: 'text-amber-400',
        },
    },
    {
        status: UserJobSearchStatus.NOT_LOOKING,
        label: 'Not Available',
        itemStyles: {
            style: 'border-slate-500/30 bg-slate-500/10',
            bg: 'bg-slate-500',
            color: 'text-slate-400',
        },
    },
];

export { USER_JOB_STATUS_CONFIG };
