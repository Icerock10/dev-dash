import bcrypt from 'bcrypt';
import { type UserService } from '~/entities/user/user.service';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserResponseDto,
} from '~/entities/user/libs/types/types';

type Constructor = {
    userService: UserService;
};

class AuthService {
    private userService: UserService;
    constructor({ userService }: Constructor) {
        this.userService = userService;
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

        const valid = await bcrypt.compare(
            String(payload?.password),
            user.password,
        );
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
        const SALT_ROUNDS = 12;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return this.userService.create({
            email,
            password: hashedPassword,
            name,
        });
    }
}

export { AuthService };
