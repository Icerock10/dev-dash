import { Input, Button } from '~/shared/ui/components/components';
import {
    signInValidationSchema,
    type SignInDto,
} from '~/entities/user/model/libs/validation-schemas/validation-schemas';
import { useAppForm } from '~/shared/hooks/hooks';

const SignIn: React.FC = () => {
    const { errors, control } = useAppForm<SignInDto>({
        defaultValues: {
            email: '',
            password: '',
        },
        validationSchema: signInValidationSchema,
    });
    return (
        <form>
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
            <Button type="submit" label="Sign in" />
        </form>
    );
};

export { SignIn };
