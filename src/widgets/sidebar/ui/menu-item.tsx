import Link from 'next/link';
import { type Menu } from '../model/libs/types/types';

type Properties = {
    item: Menu;
    isActive: boolean;
};

const MenuItem: React.FC<Properties> = ({ item, isActive }) => {
    const Icon = item.icon as React.FC<React.SVGProps<SVGSVGElement>>;
    const linkActiveClass = isActive
        ? 'text-white bg-white/8 font-medium'
        : 'text-slate-400 hover:text-white hover:bg-white/5';
    return (
        <Link
            key={item.label}
            href={item.to}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white ${linkActiveClass}`}
        >
            <div className="h-4 w-4">
                <Icon />
            </div>
            <span>{item.label}</span>
        </Link>
    );
};

export { MenuItem };
