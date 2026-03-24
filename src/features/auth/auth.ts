import { AuthService } from './auth.service';
import { userService } from '~/entities/user/user';
import { encryptor } from '~/libs/modules/encryptor/encryptor';

const authService = new AuthService({ userService, encryptor });

export { authService };

export { authOptions } from './auth.config';
