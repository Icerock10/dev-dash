'use client';

import { SessionProvider } from 'next-auth/react';
import { GlobalLoaderProvider } from './loader-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            <GlobalLoaderProvider>
                <ToastContainer />
                {children}
            </GlobalLoaderProvider>
        </SessionProvider>
    );
};

export { Providers };
