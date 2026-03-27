import { NextResponse } from 'next/server';
import { HTTPCode } from '~/shared/libs/enums/enums';
import { jobService, jobValidationSchema } from '~/entities/job/index';
import { handleRouteError } from '~/shared/libs/modules/route-handler/libs/helpers/helpers';
import { initRouteHandler } from '~/shared/libs/modules/route-handler/route.handler';

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
    (body) => jobService.create(body),
    HTTPCode.CREATED,
);

export { GET, POST };
