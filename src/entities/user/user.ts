import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { prisma } from '~/libs/modules/prisma/prisma';

const userRepository = new UserRepository({ database: prisma });
const userService = new UserService({ userRepository });

export { userService };
