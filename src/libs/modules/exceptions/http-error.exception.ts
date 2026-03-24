import { HTTPCode, DefaultErrorMessage } from '~/libs/enums/enums';
import { type ValueOf } from '~/libs/types/types';

type Constructor = {
    cause?: unknown;
    message: string;
    status: ValueOf<typeof HTTPCode>;
};

class HTTPError extends Error {
    public status: ValueOf<typeof HTTPCode>;

    public constructor({ message, cause, status }: Constructor) {
        super(message, {
            cause,
        });
        this.name = 'HTTPError';
        this.status = status;
    }
    static notFound(message = DefaultErrorMessage.NOT_FOUND): HTTPError {
        return new HTTPError({ message, status: HTTPCode.NOT_FOUND });
    }
    static unauthorized(message = DefaultErrorMessage.UNAUTHORIZED): HTTPError {
        return new HTTPError({ message, status: HTTPCode.UNAUTHORIZED });
    }
}

export { HTTPError };
