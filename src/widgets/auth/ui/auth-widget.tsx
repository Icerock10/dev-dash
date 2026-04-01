'use client';

import { useState } from '~/shared/hooks/hooks';
import { type ValueOf } from '~/shared/libs/types/types';
import { Button, Logo } from '~/shared/ui/components/components';
import { SignIn } from '~/features/auth/ui/sign-in';
import { Register } from '~/features/auth/ui/register';
import { ButtonVariant } from '~/shared/libs/enums/enums';

const AuthTab = {
    REGISTER: 'Register',
    SIGN_IN: 'Signin',
} as const;

const AuthWidget = (): React.ReactElement => {
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
        <div className="m-auto flex w-full max-w-sm flex-col items-center justify-center gap-7">
            <Logo />
            <div className="bg-surface border-border w-full rounded-lg border p-6">
                <div className="mb-6 flex gap-1 rounded-lg border border-white/5 bg-white/3 p-1">
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
            <p className="text-center font-mono text-[12px] text-slate-600">
                DevDash © 2026
            </p>
        </div>
    );
};

export { AuthWidget };
