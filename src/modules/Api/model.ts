import { HttpMethod, IDictionary } from '../../model';

export interface IApiState {
    token: string | null;
    requests: IDictionary<IRequestState>;
}

export interface IRequestState {
    id: string;
    isError: boolean;
    isLoading: boolean;
}

export interface IPayload {
    method: HttpMethod;
    resource: string;
    tokenRequired: boolean;
    loadingKey: string;
    data?: {};
    onInvoke?: string;
    onSuccess?: string;
    onError?: string;
}

export type HttpRequestData =
    Pick<IPayload, 'data' | 'loadingKey' | 'resource' | 'onError' | 'onInvoke' | 'onSuccess'>;
