import { type AuthOptions, type User } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '~/shared/libs/modules/config/config';
import { authService } from '~/features/auth/index';
import { userService } from '~/entities/user/api/user';
import { AppRoute } from '~/shared/libs/enums/enums';

const JwtTrigger = {
    SIGN_IN: 'signIn',
    SIGN_UP: 'signUp',
    UPDATE: 'update',
} as const;

type TJwtTrigger = (typeof JwtTrigger)[keyof typeof JwtTrigger];

const AuthCredentials = {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
} as const;

const SessionTokenName = {
    PROD: '__Secure-next-auth.session-token',
    DEV: 'next-auth.session-token',
} as const;

const AuthStrategy = {
    JWT: 'jwt',
    DATABASE: 'database',
} as const;

const isProduction = process.env.NODE_ENV === 'production';

const authOptions: AuthOptions = {
    session: { strategy: AuthStrategy.JWT },
    cookies: {
        sessionToken: {
            name: isProduction ? SessionTokenName.PROD : SessionTokenName.DEV,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: AppRoute.ROOT,
                secure: isProduction,
            },
        },
    },
    providers: [
        CredentialsProvider({
            credentials: AuthCredentials,
            async authorize(credentials) {
                const user = await authService.login(credentials);
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({
            token,
            user,
            trigger,
        }: {
            token: JWT;
            user?: User;
            trigger?: TJwtTrigger;
        }) {
            if (user) {
                token.id = user.id;
                token.jobSearchStatus = user.jobSearchStatus;
            }
            if (trigger === JwtTrigger.UPDATE) {
                const freshUser = await userService.findById(
                    token.id as string,
                );
                token.jobSearchStatus = freshUser?.jobSearchStatus;
                token.name = freshUser?.name;
                token.email = freshUser?.email;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.jobSearchStatus = token.jobSearchStatus as string;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },
    pages: {
        signIn: AppRoute.AUTH,
    },

    secret: config.ENV.APP.NEXTAUTH_SECRET,
};

export { authOptions };
