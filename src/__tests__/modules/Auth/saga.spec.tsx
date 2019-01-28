import { fork, put, race, select, take, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { http_request } from '../../../modules/Api/actions';
import { hasToken, saga } from '../../../modules/Auth';
import { removeToken, setToken } from '../../../modules/Auth/actions';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCEED, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from '../../../modules/Auth/actionTypes';

describe('Auth saga should', () => {
    let gen: Generator & { clone: () => Generator };
    let tokenSaga: any;
    let tryLoginLogout: any;

    beforeAll(() => {
        tokenSaga = saga.tokenSaga as any;
        tryLoginLogout = saga.tryLoginLogout as any;

        gen = cloneableGenerator(saga.sagaFunc)();
    });

    describe('sagaFunc', () => {

        it('dispatch fork with tokenSaga as arg', () =>
            expect(gen.next().value).toEqual(fork(tokenSaga)),
        );

        it('dispatch takeEvery with tryLoginLogout as arg', () => {
            expect(gen.next().value)
                .toEqual(takeEvery([LOGIN, LOGOUT], tryLoginLogout));
            expect(gen.next().done)
                .toBe(true);
        });
    });

    describe('tokenSaga', () => {

        it ('dispatch takeEvery with tokenHandlerListener as arg', () => {
            const tokenHandlerListener = saga.tokenHandlerListener as any;
            const tokenSagaGen = tokenSaga();

            expect(tokenSagaGen.next().value)
                .toEqual(takeEvery(
                    [REMOVE_TOKEN, SET_TOKEN],
                    tokenHandlerListener,
                ));
            expect(tokenSagaGen.next().done)
                .toBe(true);
        });
    });

    describe('tryLoginLogout', () => {

        it('dispatch put with removeToken as arg', () => {
            const action = {
                type: LOGOUT,
            };
            const tryLoginLogoutGen = tryLoginLogout(action);

            expect(tryLoginLogoutGen.next(action).value)
                .toEqual(put(removeToken()));
            expect(tryLoginLogoutGen.next(action).done)
                .toBe(true);
        });

        it('dispatch select with hasToken as arg', () => {
            const action = {
                type: LOGIN,
            };
            const tryLoginLogoutGen = tryLoginLogout(action);

            expect(tryLoginLogoutGen.next(action).value)
                .toEqual(select(hasToken));
        });

        it('dispatch put with setToken as arg', () => {
            const action = {
                type: LOGIN,
            };
            const tryLoginLogoutGen = tryLoginLogout(action);
            tryLoginLogoutGen.next();

            expect(tryLoginLogoutGen.next('testToken').value)
                .toEqual(put(setToken('testToken')));
        });

        it('dispatch put with http_request as arg when user has not token', () => {
            const action = {
                type: LOGIN,
                payload: {
                    data: 'testData',
                },
            };
            const tryLoginLogoutGen = tryLoginLogout(action);
            tryLoginLogoutGen.next();

            expect(tryLoginLogoutGen.next().value)
                .toEqual(put(
                    http_request.post({
                        data: {...action.payload},
                        loadingKey: 'login',
                        resource: 'auth/login',
                        onSuccess: LOGIN_SUCCEED,
                        onError: LOGIN_FAILED,
                }, false)));
        });

        it('dispatch race with take(LOGIN_SUCCEED) and take(LOGIN_FAILED) as args', () => {
            const action = {
                type: LOGIN,
                payload: {
                    data: 'testData',
                },
            };

            const tryLoginLogoutGen = tryLoginLogout({ type: LOGIN, payload: { key: 'testKey' }});
            tryLoginLogoutGen.next();
            tryLoginLogoutGen.next(action);
            tryLoginLogoutGen.next();

            expect(tryLoginLogoutGen.next().value)
                .toEqual(race({
                    ok: take(LOGIN_SUCCEED),
                    error: take(LOGIN_FAILED),
                }));
        });

        it('dispatch put with setToken as arg when login succeed', () => {
            const action = {
                type: LOGIN,
                payload: {
                    data: 'testData',
                    key: 'testKey',
                },
            };
            const response = {
                ok: {
                    payload: {
                        payload: {
                            token: 'testToken',
                        },
                    },
                },
            };
            const tryLoginLogoutGen = tryLoginLogout({ type: LOGIN, payload: { key: 'testKey' } });
            tryLoginLogoutGen.next();
            tryLoginLogoutGen.next(action);
            tryLoginLogoutGen.next();
            tryLoginLogoutGen.next();

            expect(tryLoginLogoutGen.next(response).value)
                .toEqual(put(setToken('testToken')));
        });

        it('dispatch put with setToken as arg when login succeed', () => {
            const action = {
                type: LOGIN,
                payload: {
                    data: 'testData',
                },
            };
            const response = {
                ok: null,
            };
            const tryLoginLogoutGen = tryLoginLogout({ type: LOGIN, payload: { key: 'testKey' } });
            tryLoginLogoutGen.next();
            tryLoginLogoutGen.next(action);
            tryLoginLogoutGen.next();
            tryLoginLogoutGen.next();

            expect(tryLoginLogoutGen.next(response).value)
                .toEqual(put(removeToken()));
            expect(tryLoginLogoutGen.next().done)
                .toBe(true);
        });
    });

});
