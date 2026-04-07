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

const AuthStrategy = {
    JWT: 'jwt',
    DATABASE: 'database',
} as const;

const authOptions: AuthOptions = {
    session: { strategy: AuthStrategy.JWT },

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
                token.title = user.title;
            }
            if (trigger === JwtTrigger.UPDATE || !user) {
                const freshUser = await userService.findByEmail(
                    token.email as string,
                );
                token.jobSearchStatus = freshUser?.jobSearchStatus;
                token.title = freshUser?.title;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.jobSearchStatus = token.jobSearchStatus as string;
            session.user.title = token.title as string;
            return session;
        },
    },
    pages: {
        signIn: AppRoute.LOGIN,
    },

    secret: config.ENV.APP.NEXTAUTH_SECRET,
};

export { authOptions };
