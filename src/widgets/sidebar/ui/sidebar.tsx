'use client';

import { Logo } from '~/shared/ui/components/logo';
import { usePathname } from 'next/navigation';
import { AppRoute } from '~/shared/libs/enums/enums';
import { Menulist } from './menu-list';
import { Avatar } from '~/shared/ui/components/components';
import { useSession } from 'next-auth/react';

const SideBar: React.FC = () => {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith(AppRoute.AUTH);
    const { data } = useSession();

    if (isAuthPage) {
        return null;
    }

    return (
        <div className="flex w-56 min-w-56 flex-1 flex-col border-r border-white/6 bg-[#0c1020] px-3 py-5">
            <div className="px-3">
                <Logo />
            </div>
            <Menulist pathName={pathname} />
            <Avatar userName={data?.user?.name} />
        </div>
    );
};

export { SideBar };
