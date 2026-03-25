import { NextResponse, type NextRequest } from 'next/server';
import { type ValueOf } from '~/shared/libs/types/types';
import { type ZodType } from 'zod';
import {
    HTTPError,
    ValidationError,
} from '~/shared/libs/modules/exceptions/exceptions';
import { HTTPCode, DefaultErrorMessage } from '~/shared/libs/enums/enums';

type Constructor<TBody, TResult> = {
    schema: ZodType<TBody>;
    handler: (body: TBody, req: NextRequest) => Promise<TResult>;
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

    public handle = async (req: NextRequest): Promise<Response> => {
        try {
            const json = (await req.json()) as unknown;
            const body = this.schema.parse(json);
            const result = await this.handler(body, req);
            return NextResponse.json(result, { status: this.status });
        } catch (error) {
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
        }
    };
}

export { RouteHandler };
