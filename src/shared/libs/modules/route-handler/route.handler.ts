import { RouteHandler } from './base-route-handler.module';
import { HTTPCode } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';
import { type ZodType } from 'zod';
import { type NextRequest } from 'next/server';

type RouteFunction = (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
) => Promise<Response>;

const initRouteHandler = <TBody, TResult>(
    schema: ZodType<TBody>,
    handler: (
        body: TBody,
        req: NextRequest,
        params: Record<string, string>,
    ) => Promise<TResult>,
    status: ValueOf<typeof HTTPCode> = HTTPCode.OK,
): RouteFunction => {
    return new RouteHandler({ schema, handler, status }).handle;
};

export { initRouteHandler };

export { handleRouteError } from './libs/helpers/helpers';
