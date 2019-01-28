import { IApiState } from './modules/Api';
import { IAuthState } from './modules/Auth';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IAppState {
    auth: IAuthState;
    api: IApiState;
}

export interface ILoading {
    key?: string;
}
export interface IDictionary<T> {
    [name: string]: T;
}
