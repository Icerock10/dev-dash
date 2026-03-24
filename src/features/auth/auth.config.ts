import { type AuthOptions } from 'next-auth';
import { AppRoute } from '~/libs/enums/app-route.enum';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from './auth';

const AuthStrategy = {
    JWT: 'jwt',
    DATABASE: 'database',
} as const;

const AUTH_CREDENTIALS = {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
} as const;

const authOptions: AuthOptions = {
    session: { strategy: AuthStrategy.JWT },

    providers: [
        CredentialsProvider({
            credentials: AUTH_CREDENTIALS,
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
