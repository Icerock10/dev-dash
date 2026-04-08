import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import { AppRoute } from './shared/libs/enums/enums';

const protectedRoutes = [
    AppRoute.ROOT,
    AppRoute.TASKS,
    AppRoute.JOBS,
    AppRoute.PROFILE,
];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isProtectedRoute = protectedRoutes.some((route) =>
        route === AppRoute.ROOT
            ? pathname === AppRoute.ROOT
            : pathname.startsWith(route),
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(AppRoute.AUTH, req.url));
    }

    if (pathname.startsWith(AppRoute.AUTH) && token) {
        return NextResponse.redirect(new URL(AppRoute.ROOT, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)'],
};
