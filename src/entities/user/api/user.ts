import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { prisma } from '~/shared/libs/modules/prisma/prisma';

const userRepository = new UserRepository({ database: prisma });
const userService = new UserService({ userRepository });

export { userService };
