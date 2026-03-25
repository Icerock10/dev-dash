import { Input, Button } from '~/components/components';
import { RegistrationDefaultValues } from '../../libs/constants/constants';
import {
    registerValidationSchema,
    type RegisterDto,
} from '~/entities/user/libs/validation-schemas/validation-schemas';
import { useAppForm } from '~/hooks/hooks';

const Register: React.FC = () => {
    const { errors, control } = useAppForm<RegisterDto>({
        defaultValues: RegistrationDefaultValues,
        validationSchema: registerValidationSchema,
    });

    return (
        <form>
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
