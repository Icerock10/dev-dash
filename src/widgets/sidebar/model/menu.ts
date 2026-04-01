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
        icon: OverviewIcon,
        to: AppRoute.ROOT,
    },
    {
        label: 'Jobs',
        to: AppRoute.JOBS,
        icon: JobsIcon,
    },
    {
        label: 'Tasks',
        to: AppRoute.TASKS,
        icon: TasksIcon,
    },

    {
        label: 'Profile',
        to: AppRoute.PROFILE,
        icon: ProfileIcon,
    },
];

export { menuItems };
