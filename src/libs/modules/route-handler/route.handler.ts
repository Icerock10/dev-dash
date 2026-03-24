import { RouteHandler } from './base-route-handler.module';
import { HTTPCode } from '~/libs/enums/enums';
import { type ValueOf } from '~/libs/types/types';
import { type ZodType } from 'zod';
import { type NextRequest } from 'next/server';

type RouteFunction = (req: NextRequest) => Promise<Response>;

const initRouteHandler = <TBody, TResult>(
    schema: ZodType<TBody>,
    handler: (body: TBody, req: NextRequest) => Promise<TResult>,
    status: ValueOf<typeof HTTPCode> = HTTPCode.OK,
): RouteFunction => {
    return new RouteHandler({ schema, handler, status }).handle;
};

export { initRouteHandler };
