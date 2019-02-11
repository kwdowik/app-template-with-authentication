import { Environment } from './constants';
import { IDictionary } from './model';

const fetchData =
    (cb: (...args: any[]) => Promise<Response>) =>
    async (...args: any[]) =>
        cb(...args)
            .then(createHttpResponseObjAsync)
            .catch(createHttpResponseExceptionObj);

const createHttpResponseObjAsync = async (r: Response) => {
    const headers: IDictionary<string> = {};
    r.headers.forEach((value: string, key: string) => headers[key] = value);
    return ({
        ok: r.ok,
        data: r.ok
        ? {
            payload: await r.json(),
            headers,
            code: r.status,
        }
        : {
            code: r.status,
        },
    });
};

interface IExceptionObj {
    code?: number;
    error?: string;
}

const createHttpResponseExceptionObj = ({code, error}: IExceptionObj) => ({
    ok: false,
    data: {
        code:  code || -1,
        error: error || 'Error has been occured during fetch data',
    },
});

const api = process.env.NODE_ENV === Environment.TEST
    ? { fetchData, createHttpResponseExceptionObj, createHttpResponseObjAsync }
    : { fetchData };

export { api };
