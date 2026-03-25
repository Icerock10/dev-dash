import axios, {
    type AxiosInstance,
    type AxiosError,
    type RawAxiosRequestHeaders,
} from 'axios';
import { HttpMethod, type HTTPCode } from '~/libs/enums/enums';
import { HTTPError } from '../exceptions/http-error.exception.js';
import { type ValueOf } from '~/libs/types/types';

type HttpOptions<T = unknown> = {
    method?: ValueOf<typeof HttpMethod>;
    data?: T;
    headers?: RawAxiosRequestHeaders;
};

type HttpApi = {
    load<TResponse, TBody = unknown>(
        url: string,
        options?: HttpOptions<TBody>,
    ): Promise<TResponse>;
};

class HTTP implements HttpApi {
    private axiosInstance: AxiosInstance;

    public constructor() {
        this.axiosInstance = axios.create({
            timeout: 5000,
        });
    }

    public async load<TResponse, TBody = unknown>(
        url: string,
        options?: HttpOptions<TBody>,
    ): Promise<TResponse> {
        const { data, headers = {}, method = HttpMethod.GET } = options ?? {};

        const response = await this.axiosInstance
            .request<TResponse>({ url, method, headers, data })
            .catch(this.handleError);

        return response.data;
    }

    private handleError = (error: AxiosError): never => {
        const status = error.response?.status as ValueOf<typeof HTTPCode>;
        const data = error.response?.data;

        throw new HTTPError({
            message: JSON.stringify(data ?? error.message),
            status,
        });
    };
}

export { HTTP };
