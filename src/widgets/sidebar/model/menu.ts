import { AppRoute } from '~/shared/libs/enums/enums';
import { type Menu } from './libs/types/types';
import {
    OverviewIcon,
    JobsIcon,
    TasksIcon,
    ProfileIcon,
} from '~/shared/ui/icons/icons';

const menuItems: Menu[] = [
    {
        label: 'Overview',
        icon: OverviewIcon as Menu['icon'],
        to: AppRoute.ROOT,
    },
    {
        label: 'Jobs',
        to: AppRoute.JOBS,
        icon: JobsIcon as Menu['icon'],
    },
    {
        label: 'Tasks',
        to: AppRoute.TASKS,
        icon: TasksIcon as Menu['icon'],
    },

    {
        label: 'Profile',
        to: AppRoute.PROFILE,
        icon: ProfileIcon as Menu['icon'],
    },
];

export { menuItems };
