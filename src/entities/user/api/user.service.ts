import {
    type UserSignUpRequestDto,
    type UserResponseDto,
    type BaseService,
    type UserDto,
} from '../model/libs/types/types';
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
    public async findById(id: string): Promise<UserDto | null> {
        const foundUser = await this.userRepository.findById(id);
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
    public updateUser(id: string, payload: Partial<UserDto>): Promise<UserDto> {
        return this.userRepository.updateUser(id, payload);
    }
    public addSkill(id: string, skill: string): Promise<UserDto> {
        return this.userRepository.addSkill(id, skill);
    }
    public removeSkill(id: string, skill: string): Promise<UserDto> {
        return this.userRepository.removeSkill(id, skill);
    }
    public deleteUser(id: string): Promise<UserDto> {
        return this.userRepository.deleteUser(id);
    }
}

export { UserService };
