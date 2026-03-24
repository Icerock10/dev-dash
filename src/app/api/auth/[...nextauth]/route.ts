import NextAuth from 'next-auth';
import { authOptions } from '~/features/auth/auth.config';
import { type NextRequest } from 'next/server';

type AppRouteHandler = (
    req: NextRequest,
    context: unknown,
) => Promise<Response>;

// next-auth v4 does not support App Router natively, cast is required

const handler = NextAuth(authOptions) as unknown as AppRouteHandler;

export { handler as GET, handler as POST };
