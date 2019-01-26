import { CALL } from './actionTypes';
import { HttpRequestData } from './model';

const createHttpRequest = (method: string) =>
    (data: HttpRequestData, tokenRequired: boolean = true) => ({
        type: CALL,
        payload: {
            method,
            ...data,
            tokenRequired,
        },
    });

export const http_request = {
    post: createHttpRequest('POST'),
    put: createHttpRequest('PUT'),
    get: createHttpRequest('GET'),
    delete: createHttpRequest('DELETE'),
};
