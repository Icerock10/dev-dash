import { HTTPCode } from '~/shared/libs/enums/enums';
import { jobService, jobValidationSchema } from '~/entities/job/index';
import { initRouteHandler } from '~/shared/libs/modules/route-handler/route.handler';
import { getServerSession } from 'next-auth';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

const POST = initRouteHandler(
    jobValidationSchema,
    async (body) => {
        const session = await getServerSession();
        const userId = session?.user.id;
        if (!userId) {
            throw HTTPError.unauthorized();
        }
        return jobService.create(userId, body);
    },
    HTTPCode.CREATED,
);

export { POST };
