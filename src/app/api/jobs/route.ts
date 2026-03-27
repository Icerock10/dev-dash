import { NextResponse } from 'next/server';
import { HTTPCode } from '~/shared/libs/enums/enums';
import { jobService, jobValidationSchema } from '~/entities/job/index';
import {
    initRouteHandler,
    handleRouteError,
} from '~/shared/libs/modules/route-handler/route.handler';
import { getServerSession } from 'next-auth';
import { HTTPError } from '~/shared/libs/modules/exceptions/exceptions';

const GET = async (): Promise<NextResponse> => {
    try {
        const jobs = await jobService.getAll();
        return NextResponse.json(jobs, { status: HTTPCode.OK });
    } catch (error) {
        return handleRouteError(error);
    }
};

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

export { GET, POST };
