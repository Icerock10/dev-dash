import { Input, Button } from '~/shared/ui/components/components';
import {
    registerValidationSchema,
    type RegisterDto,
} from '~/entities/user/index';
import { useAppForm } from '~/shared/hooks/hooks';
import { useAuth } from '../../model/hooks/hooks';
import { actions as authActions } from '../../actions/actions';

const Register: React.FC = () => {
    const { errors, control, handleSubmit } = useAppForm<RegisterDto>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: registerValidationSchema,
    });

    const { handleAuthAction } = useAuth({
        authAction: authActions.register,
    });

    const onSubmit = (event: React.SyntheticEvent): void => {
        void handleSubmit(handleAuthAction)(event);
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                label="Name"
                name="name"
                placeholder="Your name"
                control={control}
                errors={errors}
            />
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
                control={control}
                errors={errors}
                placeholder="*********"
                type="password"
            />
            <Button type="submit" label="Create Account" />
        </form>
    );
};

export { Register };
