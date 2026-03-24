import { AuthService } from './auth.service';
import { userService } from '~/entities/user/user';

const authService = new AuthService({ userService });

export { authService };

export { authOptions } from './auth.config';
