import { AuthService } from './auth.service';
import { userService } from '~/entities/user/api/user';
import { encryptor } from '~/shared/libs/modules/encryptor/encryptor';

const authService = new AuthService({ userService, encryptor });

export { authService };
