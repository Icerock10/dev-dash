import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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

    pages: {
        signIn: AppRoute.LOGIN,
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
