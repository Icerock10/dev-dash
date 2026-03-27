import { prisma } from '../prisma';
import { encryptor } from '../../encryptor/encryptor';
import { type User } from '~/generated/client';

const userSeed = async (): Promise<User> => {
    const { hash } = await encryptor.encrypt('mypassword123');
    return prisma.user.upsert({
        where: { email: 'icerock@dev.io' },
        update: {},
        create: {
            email: 'icerock@dev.io',
            password: hash,
            name: 'Icerock10',
        },
    });
};

export { userSeed };
