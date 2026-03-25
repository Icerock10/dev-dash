import { Input, Button } from '~/shared/ui/components/components';
import {
    registerValidationSchema,
    type RegisterDto,
} from '~/entities/user/model/libs/validation-schemas/validation-schemas';
import { useAppForm } from '~/shared/hooks/hooks';
import { useAuth } from '../../model/hooks/hooks';

const Register: React.FC = () => {
    const { errors, control, handleSubmit } = useAppForm<RegisterDto>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: registerValidationSchema,
    });

    const { onRegister } = useAuth();

    const onSubmit = (event: React.SyntheticEvent): void => {
        void handleSubmit(onRegister)(event);
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
