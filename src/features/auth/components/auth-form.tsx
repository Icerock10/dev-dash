'use client';

import { useState } from '~/hooks/hooks';
import { type ValueOf } from '~/libs/types/types';
import { Button } from '~/components/components';
import { Register } from './tabs/register';
import { ButtonVariant } from '~/libs/enums/enums';
import { SignIn } from './tabs/sign-in';

const AuthTab = {
    REGISTER: 'Register',
    SIGN_IN: 'Signin',
} as const;

const AuthForm = (): React.ReactElement => {
    const [activeTab, setActiveTab] = useState<ValueOf<typeof AuthTab>>(
        AuthTab.REGISTER,
    );

    const handleRegisterTabClick = (): void => {
        setActiveTab(AuthTab.REGISTER);
    };
    const handleSignInTabClick = (): void => {
        setActiveTab(AuthTab.SIGN_IN);
    };

    const getActiveAuthTab =
        activeTab === AuthTab.REGISTER ? <Register /> : <SignIn />;

    return (
        <div className="w-full h-lvh flex flex-col gap-7 items-center justify-center">
            <h1 className="font-mono text-[15px] font-semibold text-white tracking-tight">
                DevDash
            </h1>
            <div className="p-6 bg-surface w-full max-w-sm">
                <div className="flex gap-1 mb-6 p-1 rounded-lg bg-white/3 border border-white/5">
                    <Button
                        isActive={activeTab === AuthTab.SIGN_IN}
                        onClick={handleSignInTabClick}
                        label="Sign in"
                        variant={ButtonVariant.TAB}
                    />
                    <Button
                        onClick={handleRegisterTabClick}
                        isActive={activeTab === AuthTab.REGISTER}
                        label="Register"
                        variant={ButtonVariant.TAB}
                    />
                </div>
                {getActiveAuthTab}
            </div>
            <p className="text-center text-[12px] text-slate-600 font-mono">
                DevDash © 2026
            </p>
        </div>
    );
};

export { AuthForm };
