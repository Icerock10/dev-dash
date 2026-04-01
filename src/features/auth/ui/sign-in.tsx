import { Input, Button } from '~/shared/ui/components/components';
import { signInValidationSchema, type SignInDto } from '~/entities/user/index';
import { useAppForm } from '~/shared/hooks/hooks';
import { useAuth } from '../model/hooks/hooks';
import { actions as authActions } from '../model/actions/actions';

const SignIn: React.FC = () => {
    const { errors, control, handleSubmit } = useAppForm<SignInDto>({
        defaultValues: {
            email: '',
            password: '',
        },
        validationSchema: signInValidationSchema,
    });

    const { handleAuthAction } = useAuth({
        authAction: authActions.login,
    });

    const onSubmit = (event: React.SyntheticEvent): void => {
        void handleSubmit(handleAuthAction)(event);
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                label="Email"
                name="email"
                placeholder="john-doe@gmail.com"
                control={control}
                errors={errors}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                control={control}
                errors={errors}
                placeholder="*********"
            />
            <Button className="w-full" type="submit" label="Sign in" />
        </form>
    );
};

export { SignIn };
