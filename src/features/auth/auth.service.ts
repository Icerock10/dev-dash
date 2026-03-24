import { type UserService } from '~/entities/user/user.service';
import { type BaseEncryptor } from '~/libs/modules/encryptor/base-encryptor.module';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserResponseDto,
} from '~/entities/user/libs/types/types';

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
            throw new Error('Not found');
        }
        const valid = await this.encryptor.compare({
            value: String(payload?.password),
            storedHash: user.password,
        });
        if (!valid) {
            throw new Error('Password incorrect');
        }

        return user;
    }

    public async register({
        password,
        name,
        email,
    }: UserSignUpRequestDto): Promise<unknown> {
        const hashedPassword = await this.encryptor.encrypt(password);
        return this.userService.create({
            email,
            password: hashedPassword.hash,
            name,
        });
    }
}

export { AuthService };
