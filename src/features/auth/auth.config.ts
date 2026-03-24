import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from './auth';
import { AuthCredentials, AuthStrategy } from './libs/constants/constants';
import { AppRoute } from './libs/enums/enums';

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
