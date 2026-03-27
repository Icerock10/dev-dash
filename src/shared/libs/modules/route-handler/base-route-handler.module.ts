import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError } from './libs/helpers/helpers';
import { type ValueOf } from '~/shared/libs/types/types';
import { type ZodType } from 'zod';
import { type HTTPCode } from '~/shared/libs/enums/enums';

type Constructor<TBody, TResult> = {
    schema: ZodType<TBody>;
    handler: (
        body: TBody,
        req: NextRequest,
        params: Record<string, string>,
    ) => Promise<TResult>;
    status: ValueOf<typeof HTTPCode>;
};

class RouteHandler<TBody, TResult> {
    private readonly schema;
    private readonly handler;
    private readonly status;

    public constructor({
        status,
        schema,
        handler,
    }: Constructor<TBody, TResult>) {
        this.schema = schema;
        this.handler = handler;
        this.status = status;
    }

    public handle = async (
        req: NextRequest,
        { params }: { params: Promise<Record<string, string>> },
    ): Promise<Response> => {
        try {
            const resolvedParams = await params;
            const json = (await req.json()) as unknown;
            const body = this.schema.parse(json);
            const result = await this.handler(body, req, resolvedParams);
            return NextResponse.json(result, { status: this.status });
        } catch (error) {
            return handleRouteError(error);
        }
    };
}

export { RouteHandler };
