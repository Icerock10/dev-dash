'use client';

import { useState } from '~/shared/hooks/hooks';
import { type ValueOf } from '~/shared/libs/types/types';
import { Button } from '~/shared/ui/components/components';
import { Register } from './tabs/register';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { SignIn } from './tabs/sign-in';
import { LogoIcon } from '~/shared/ui/icons/icons';

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
        <div className="m-auto w-full max-w-sm flex flex-col gap-7 items-center justify-center">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                    <LogoIcon />
                </div>
                <span className="font-mono text-[15px] font-semibold text-white tracking-tight">
                    DevDash
                </span>
            </div>
            <div className="p-6 bg-surface w-full border border-border rounded-lg">
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
