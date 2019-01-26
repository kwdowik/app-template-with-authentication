
import { AnyAction } from 'redux';
import { fork, put, race, select, take, takeEvery } from 'redux-saga/effects';
import { ACCESS_TOKEN } from '../../constants';
import { http_request } from '../Api/actions';
import { removeToken, setToken } from './actions';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCEED, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from './actionTypes';
import { hasToken } from './selectors';

const saga = function*() {
    yield fork(tokenSaga);
    yield takeEvery([LOGIN, LOGOUT], tryLoginLogout);
};

function* tryLoginLogout(action: any) {
    if (action.type === LOGOUT) {
        return yield put(removeToken());
    }

    const userToken = yield select(hasToken);
    if (userToken) {
        yield put(setToken(userToken));
    }

    yield put(
        http_request.post({
            data: {...action.payload},
            loadingKey: 'login',
            resource: 'auth/login',
            onSuccess: LOGIN_SUCCEED,
            onError: LOGIN_FAILED,
    }, false));

    const { ok } = yield race({
        ok: take(LOGIN_SUCCEED),
        error: take(LOGIN_FAILED),
    });

    const { token } = ok.payload.payload;
    ok ? yield put(setToken(token)) : yield put(removeToken());
}

function* tokenSaga() {
    yield takeEvery(
        [REMOVE_TOKEN, SET_TOKEN],
        tokenHandlerListener,
    );
}

const tokenHandlerListener = (action: AnyAction): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    if (action.type === SET_TOKEN) {
        localStorage.setItem(ACCESS_TOKEN, action.payload.token);
    }
};

export { saga };
