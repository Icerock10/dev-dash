import { authService } from '~/features/auth/model/services/auth';
import { HTTPCode } from '~/shared/libs/enums/enums';
import { initRouteHandler } from '~/shared/libs/modules/route-handler/route.handler';
import { registerValidationSchema } from '~/entities/user/index';

const POST = initRouteHandler(
    registerValidationSchema,
    (body) => authService.register(body),
    HTTPCode.CREATED,
);

export { POST };
