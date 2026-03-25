import { HTTPCode, DefaultErrorMessage } from '~/shared/libs/enums/enums';
import { type ValueOf } from '~/shared/libs/types/types';

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
    static notFound(
        message: string = DefaultErrorMessage.NOT_FOUND,
    ): HTTPError {
        return new HTTPError({ message, status: HTTPCode.NOT_FOUND });
    }
    static unauthorized(
        message: string = DefaultErrorMessage.UNAUTHORIZED,
    ): HTTPError {
        return new HTTPError({ message, status: HTTPCode.UNAUTHORIZED });
    }
    static conflict(message: string = DefaultErrorMessage.CONFLICT): HTTPError {
        return new HTTPError({ message, status: HTTPCode.CONFLICT });
    }
    static internalError(
        message: string = DefaultErrorMessage.INTERNAL_ERROR,
    ): HTTPError {
        return new HTTPError({
            message,
            status: HTTPCode.INTERNAL_SERVER_ERROR,
        });
    }
}

export { HTTPError };
