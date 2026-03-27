import { type AuthOptions, type User } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '~/shared/libs/modules/config/config';
import { authService } from '~/features/auth/index';
import { AppRoute } from '~/shared/libs/enums/enums';

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
        jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        },
    },
    pages: {
        signIn: AppRoute.LOGIN,
    },

    secret: config.ENV.APP.NEXTAUTH_SECRET,
};

export { authOptions };
