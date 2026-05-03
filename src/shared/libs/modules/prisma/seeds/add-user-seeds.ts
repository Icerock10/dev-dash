import { prisma } from '../prisma';
import { encryptor } from '../../encryptor/encryptor';
import { type User } from '~/generated/client';

const userSeed = async (): Promise<User> => {
    const { hash } = await encryptor.encrypt('guest123123');
    return prisma.user.create({
        data: {
            email: `guest${String(Date.now())}@dev.io`,
            password: hash,
            name: 'Guest',
            title: 'Frontend Developer',
            location: 'Berlin, DE',
            skills: ['React', 'Typescript', 'NodeJs'],
            github: 'https://github.com/someprofile',
            linkedin: 'https://linkedin.com/someprofile',
        },
    });
};

export { userSeed };
