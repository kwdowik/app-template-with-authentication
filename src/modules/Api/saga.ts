import { AnyAction } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { HttpMethod, IDictionary } from '../../model';
import { CALL } from './actionTypes';

export function* saga(url: string) {
    yield takeEvery(CALL, fetchSaga, url);
}

const methodsWithBody: HttpMethod[]  = [ 'PATCH', 'PATCH', 'PUT', 'POST', 'DELETE' ];

const fetchSaga = function*(baseUrl: string, action: AnyAction): any {
    const { payload } = action;
    const url = `${baseUrl}/${payload.resource}`;
    const headers = {} as Headers;

    const init: RequestInit = {
        method: payload.method,
        headers,
        mode: 'cors',
    };

    if (methodsWithBody.indexOf(payload.method) !== -1) {
        init.body = JSON.stringify(payload.data);
    }

    try {
        const response = yield call(fetchData, url, init);
        response.ok
            ? yield put({type: payload.onSuccess, response})
            : yield put({type: payload.onError, response});
    } catch (error) {
        yield put({type: payload.onError, error});
    }
};

const fetchData = async (url: string, init: RequestInit) => {
    return fetch(url, init)
        .then(async (r: Response) => {
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
        })
        .catch(() => ({
            ok: false,
            data: {
                code: -1,
                error: 'Error has been occured during fetch data',
            },
        }));
};
