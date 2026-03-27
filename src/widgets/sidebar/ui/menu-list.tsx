import { AppRoute } from '~/shared/libs/enums/enums';
import { menuItems } from '../model/menu';
import { MenuItem } from './menu-item';

type Properties = {
    pathName: string;
};

const Menulist: React.FC<Properties> = ({ pathName }) => {
    return (
        <nav className="mt-10 flex flex-1 flex-col gap-0.5 text-sm">
            {menuItems.map((item) => {
                const isActive =
                    item.to === AppRoute.ROOT
                        ? pathName === item.to
                        : pathName.startsWith(item.to);
                return (
                    <MenuItem
                        key={item.label}
                        isActive={isActive}
                        item={item}
                    />
                );
            })}
        </nav>
    );
};

export { Menulist };
