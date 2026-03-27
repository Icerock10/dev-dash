import { type ValueOf } from '~/shared/libs/types/types';
import { type AppRoute } from '~/shared/libs/enums/enums';

type Menu = {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    to: ValueOf<typeof AppRoute>;
};

export { type Menu };
