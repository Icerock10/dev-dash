import { type UserService } from '~/entities/user/api/user.service';
import { type BaseEncryptor } from '~/shared/libs/modules/encryptor/base-encryptor.module';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';
import {
    type UserSignInRequestDto,
    type UserResponseDto,
    type UserSignUpRequestDto,
} from '../libs/types/types';
import { UserValidationMessage } from '../libs/enums/enums';

type Constructor = {
    userService: UserService;
    encryptor: BaseEncryptor;
};

class AuthService {
    private userService: UserService;
    private encryptor: BaseEncryptor;
    constructor({ userService, encryptor }: Constructor) {
        this.userService = userService;
        this.encryptor = encryptor;
    }
    public async login(
        payload?: UserSignInRequestDto,
    ): Promise<UserResponseDto> {
        const user = await this.userService.findByEmail(
            payload?.email as string,
        );
        if (!user) {
            throw HTTPError.notFound();
        }
        const isPasswordValid = await this.encryptor.compare({
            value: String(payload?.password),
            storedHash: user.password,
        });
        if (!isPasswordValid) {
            throw HTTPError.unauthorized(
                UserValidationMessage.CURRENT_PASSWORD_INVALID,
            );
        }

        return user;
    }

    public async register({
        password,
        name,
        email,
    }: UserSignUpRequestDto): Promise<UserResponseDto> {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw HTTPError.conflict(
                UserValidationMessage.EMAIL_ALREADY_EXISTS,
            );
        }
        const hashedPassword = await this.encryptor.encrypt(password);
        return this.userService.create({
            email,
            password: hashedPassword.hash,
            name,
        });
    }
}

export { AuthService };
