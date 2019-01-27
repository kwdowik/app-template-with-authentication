import { all } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import { apiUrl } from './constants';
import { saga as apiSaga } from './modules/Api';
import { saga as authSaga } from './modules/Auth';

export const rootSaga = function*() {
    yield all([
        // tslint:disable-next-line:no-console
        takeEvery('*', console.log),
        authSaga.sagaFunc(),
        apiSaga(apiUrl),
    ]);
};
