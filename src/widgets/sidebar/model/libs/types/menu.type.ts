import { type ValueOf } from '~/shared/libs/types/types';
import { type AppRoute } from '~/shared/libs/enums/enums';

type Menu = {
    label: string;
    icon: unknown;
    to: ValueOf<typeof AppRoute>;
};

export { type Menu };
