import { NextResponse } from 'next/server';
import { handleRouteError } from '~/shared/libs/modules/route-handler/libs/helpers/helpers';
import { HTTPCode } from '~/shared/libs/enums/enums';
import { jobService, type JobUpdateDto } from '~/entities/job/index';

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

const PATCH = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
    try {
        const { id } = await params;
        const json = (await req.json()) as JobUpdateDto;
        const job = await jobService.update(id, json);

        return NextResponse.json(job, { status: HTTPCode.OK });
    } catch (error) {
        return handleRouteError(error);
    }
};

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
