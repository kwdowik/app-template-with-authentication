import { AnyAction } from 'redux';
import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { v1 } from 'uuid';
import { api } from '../../api';
import { Environment } from '../../constants';
import { HttpMethod } from '../../model';
import { ADD_REQUEST, CALL, RESOLVE_REQUEST } from './actionTypes';

const sagaFunc = function*(url: string) {
    yield takeEvery(CALL, fetchSaga, url);
};

const methodsWithBody: HttpMethod[]  = [ 'PATCH', 'PATCH', 'PUT', 'POST', 'DELETE' ];

const fetchSaga = function*(baseUrl: string, action: AnyAction): any {
    const { payload } = action;
    const key = payload.loadingKey || v1();
    const url = `${baseUrl}/${payload.resource}`;
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });

    const init: RequestInit = {
        method: payload.method,
        headers,
        mode: 'cors',
    };

    if (methodsWithBody.indexOf(payload.method) !== -1) {
        init.body = JSON.stringify(payload.data);
    }

    yield(put({
        type: ADD_REQUEST,
        payload: {
            id: key,
            isLoading: true,
            isError: false,
        }}));

    try {

        yield call(delay, 1500);
        const fetchData = api.fetchData(fetch);
        const response = yield call(fetchData, url, init);

        response.ok
            ?   yield put({type: payload.onSuccess, payload: response.data})
            :   yield put({type: payload.onError, payload: response.data});

        yield put({type: RESOLVE_REQUEST, payload: {
            id: key,
            isLoading: false,
            isError: !response.ok,
        }});
    } catch (error) {
        yield put({type: payload.onError, error});
    }
};

const saga = process.env.NODE_ENV === Environment.TEST
    ? { sagaFunc, fetchSaga }
    : { sagaFunc };

export { saga };
