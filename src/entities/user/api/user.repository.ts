import {
    type UserDto,
    type UserSignUpRequestDto,
    type PrismaClient,
    type BaseRepository,
} from '../model/libs/types/types';

type Constructor = {
    database: PrismaClient;
};

class UserRepository implements BaseRepository<UserDto, UserSignUpRequestDto> {
    private readonly database: PrismaClient;
    public constructor({ database }: Constructor) {
        this.database = database;
    }
    public async findByEmail(email: string): Promise<UserDto | null> {
        const foundUser = await this.database.user.findUnique({
            where: { email },
        });
        return foundUser ?? null;
    }
    public create(payload: UserSignUpRequestDto): Promise<UserDto> {
        return this.database.user.create({ data: payload });
    }
    public getAll(): Promise<UserDto[]> {
        return this.database.user.findMany();
    }
    public updateUser(id: string, payload: Partial<UserDto>): Promise<UserDto> {
        return this.database.user.update({ where: { id }, data: payload });
    }
}

export { UserRepository };
