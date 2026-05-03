import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { useAuth } from '../model/hooks/hooks';
import { actions as authActions } from '../model/actions/actions';

const GuestLogin: React.FC = () => {
    const { handleAuthAction } = useAuth({
        authAction: authActions.loginAsGuest,
    });

    return (
        <>
            <div className="m-3 flex items-center gap-4">
                <div className="bg-border h-px flex-1" />
                <span className="text-muted-foreground text-sm">or</span>
                <div className="bg-border h-px flex-1" />
            </div>
            <Button
                className="m-auto w-full px-2 text-xs"
                label="Login as Guest"
                variant={ButtonVariant.SECONDARY}
                onClick={() => {
                    void handleAuthAction(null);
                }}
            />
        </>
    );
};

export { GuestLogin };
