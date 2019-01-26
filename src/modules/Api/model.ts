import { HttpMethod } from '../../model';

export interface IApiState {
    token: string | null;
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
    error: string;
}

export type HttpRequestData = Pick<IPayload, 'data' | 'loadingKey' | 'resource' | 'onError' | 'onInvoke' | 'onSuccess'>;
