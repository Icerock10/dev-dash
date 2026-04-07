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
    public async updateUser(
        id: string,
        payload: Partial<UserDto>,
    ): Promise<UserDto> {
        return this.database.user.update({ where: { id }, data: payload });
    }
    public async addSkill(id: string, skill: string): Promise<UserDto> {
        const current = await this.getSkills(id);
        const skills = [...new Set([...(current?.skills ?? []), skill])];
        return this.database.user.update({ where: { id }, data: { skills } });
    }
    public getSkills(
        id: string,
    ): Promise<{ skills: UserDto['skills'] } | null> {
        return this.database.user.findUnique({
            where: { id },
            select: { skills: true },
        });
    }

    public async removeSkill(id: string, skill: string): Promise<UserDto> {
        const current = await this.getSkills(id);
        const skills = (current?.skills ?? []).filter((s) => s !== skill);
        return this.database.user.update({ where: { id }, data: { skills } });
    }
}

export { UserRepository };
