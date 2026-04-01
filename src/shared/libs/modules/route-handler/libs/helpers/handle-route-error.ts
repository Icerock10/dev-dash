import { HTTPCode, DefaultErrorMessage } from '~/shared/libs/enums/enums';
import { NextResponse } from 'next/server';
import {
    HTTPError,
    ValidationError,
} from '~/shared/libs/modules/exceptions/exceptions';

type RouteErrorResponse =
    | { message: string; status: number; name?: string }
    | { errors: { field: string; message: string }[] };

const handleRouteError = (error: unknown): NextResponse<RouteErrorResponse> => {
    if (error instanceof ValidationError) {
        return NextResponse.json(
            {
                errors: error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            },
            { status: HTTPCode.BAD_REQUEST },
        );
    }
    if (error instanceof HTTPError) {
        return NextResponse.json(
            {
                message: error.message,
                status: error.status,
                name: error.name,
            },
            { status: error.status },
        );
    }
    return NextResponse.json(
        {
            message: DefaultErrorMessage.INTERNAL_ERROR,
            status: HTTPCode.INTERNAL_SERVER_ERROR,
        },
        { status: HTTPCode.INTERNAL_SERVER_ERROR },
    );
};

export { handleRouteError };
