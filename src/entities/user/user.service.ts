import {
    type UserSignUpRequestDto,
    type UserResponseDto,
    type BaseService,
    type UserDto,
} from './libs/types/types';
import { type UserRepository } from './user.repository';

type Constructor = {
    userRepository: UserRepository;
};

class UserService implements BaseService<
    UserResponseDto,
    UserSignUpRequestDto
> {
    private readonly userRepository: UserRepository;
    public constructor({ userRepository }: Constructor) {
        this.userRepository = userRepository;
    }
    public async findByEmail(email: string): Promise<UserDto | null> {
        const foundUser = await this.userRepository.findByEmail(email);
        return foundUser ?? null;
    }
    public async create(
        payload: UserSignUpRequestDto,
    ): Promise<UserResponseDto> {
        return this.userRepository.create(payload);
    }
    public async getAll(): Promise<UserResponseDto[]> {
        return this.userRepository.getAll();
    }
}

export { UserService };
