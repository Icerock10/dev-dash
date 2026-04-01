import { NextResponse } from 'next/server';
import {
    handleRouteError,
    initRouteHandler,
} from '~/shared/libs/modules/route-handler/route.handler';
import { HTTPCode } from '~/shared/libs/enums/enums';
import { jobService, jobUpdateValidationSchema } from '~/entities/job/index';

const GET = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
    try {
        const { id } = await params;
        const job = await jobService.getById(id);

        return NextResponse.json(job, { status: HTTPCode.OK });
    } catch (error) {
        return handleRouteError(error);
    }
};

const PATCH = initRouteHandler(
    jobUpdateValidationSchema,
    (body, _req, params) => jobService.update(params.id, body),
    HTTPCode.OK,
);

const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
    try {
        const { id } = await params;
        const job = await jobService.delete(id);

        return NextResponse.json(job, { status: HTTPCode.OK });
    } catch (error) {
        return handleRouteError(error);
    }
};

export { DELETE, GET, PATCH };
