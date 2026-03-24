import { authService } from '~/features/auth/auth';
import { HTTPCode } from '~/libs/enums/enums';
import { initRouteHandler } from '~/libs/modules/route-handler/route.handler';
import { registerValidationSchema } from '~/entities/user/user';

const POST = initRouteHandler(
    registerValidationSchema,
    (body) => authService.register(body),
    HTTPCode.CREATED,
);

export { POST };
