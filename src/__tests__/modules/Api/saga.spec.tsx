import { AnyAction } from 'redux';
import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { api } from '../../../api';
import { saga } from '../../../modules/Api';
import { ADD_REQUEST, CALL, RESOLVE_REQUEST } from '../../../modules/Api/actionTypes';

describe('Api saga should', () => {
    let gen: Generator & { clone: () => Generator };
    let fetchSaga: (baseUrl: string, action: AnyAction) => any;

    beforeAll(() => {
        fetchSaga = saga.fetchSaga as any;
        gen = cloneableGenerator(saga.sagaFunc)('fakeUrl');
    });

    describe('sagaFunc', () => {
        it('dispatch takeEvery with fetchSaga as arg', () => {
            expect(gen.next().value)
                .toEqual(takeEvery(CALL, fetchSaga, 'fakeUrl'));
            expect(gen.next().done)
                .toBe(true);
        });
    });

    describe('fetchSaga', () => {
        let fetchSagaGen: Generator & { clone: () => Generator };
        let fakeFetchData: any;
        let action: AnyAction;

        beforeAll(() => Object.defineProperty(global, 'Headers', { value: () => ({})}));
        beforeEach(() => {
            action = {
                type: 'GET',
                payload: {
                    method: 'GET',
                    data: 'fakeData',
                    loadingKey: 'fakeLoadingKey',
                    resource: 'fakeResource',
                    onSuccess: () => jest.fn(),
                    onError: () => jest.fn(),
                },
            };
            window.fetch = jest.fn();
            fakeFetchData = jest.fn(() => jest.fn());
            api.fetchData = fakeFetchData;
            fetchSagaGen = cloneableGenerator(fetchSaga)('fakeBaseUrl', action);
        });

        it('dispatch put with ADD_REQUEST type action as arg', () => {
            expect(fetchSagaGen.next().value)
                .toEqual(put({
                    type: ADD_REQUEST,
                    payload: {
                        id: 'fakeLoadingKey',
                        isLoading: true,
                        isError: false,
                    },
                }));
            expect(fetchSagaGen.next().done)
                .toBe(false);
        });

        it('dispatch call with delay as arg', () => {
            fetchSagaGen.next();
            expect(fetchSagaGen.next().value)
                .toEqual(call(delay, 1500));
            expect(fetchSagaGen.next().done)
                .toBe(false);
        });

        it('dispatch call with fetchData as arg', () => {
            fetchSagaGen.next();
            fetchSagaGen.next();
            expect(JSON.stringify(fetchSagaGen.next().value))
                .toEqual(JSON.stringify(call(fakeFetchData(), 'fakeBaseUrl/fakeResource', {
                    method: 'GET',
                    headers: {},
                    mode: 'cors',
                })));
            expect(fetchSagaGen.next().done)
                .toBe(false);
        });

        it('dispatch call with fetchData as arg and request init with body', () => {
            const postAction = {...action,
                payload: {
                    ...action.payload,
                    method: 'POST',
                },
            };
            const postSagaGen = cloneableGenerator(fetchSaga)('fakeBaseUrl', postAction);

            postSagaGen.next();
            postSagaGen.next();
            expect(JSON.stringify(postSagaGen.next().value))
                .toEqual(JSON.stringify(call(fakeFetchData(), 'fakeBaseUrl/fakeResource', {
                    method: 'POST',
                    headers: {},
                    mode: 'cors',
                    body: JSON.stringify('fakeData'),
                })));
            expect(postSagaGen.next().done)
                .toBe(false);
        });

        it('dispatch put with OnSuccess when response.ok equal true', () => {
            fetchSagaGen.next();
            fetchSagaGen.next();
            fetchSagaGen.next();
            expect(fetchSagaGen.next({ok: true, data: 'testData' }).value)
                .toEqual(put({type: action.payload.onSuccess, payload: 'testData' }));
            expect(fetchSagaGen.next().done)
                .toBe(false);
        });

        it('dispatch put with OnError when response.ok equal false', () => {
            fetchSagaGen.next();
            fetchSagaGen.next();
            fetchSagaGen.next();
            expect(fetchSagaGen.next({ok: false, data: 'testData' }).value)
                .toEqual(put({type: action.payload.onError, payload: 'testData' }));
            expect(fetchSagaGen.next().done)
                .toBe(false);
        });

        it('dispatch put with RESOLVE_REQUEST', () => {
            fetchSagaGen.next();
            fetchSagaGen.next();
            fetchSagaGen.next();
            fetchSagaGen.next({ok: true, data: 'testData' });
            expect(fetchSagaGen.next().value)
                .toEqual(put({type: RESOLVE_REQUEST,
                    payload: {
                        id: 'fakeLoadingKey',
                        isLoading: false,
                        isError: false,
                    },
                }));
            expect(fetchSagaGen.next().done)
                .toBe(true);
        });

        it('dispatch put with OnError when excpetion has been thrown', () => {
            fetchSagaGen.next();
            fetchSagaGen.next();
            fetchSagaGen.next();
            expect(fetchSagaGen.next().value)
                .toEqual(put({
                    type: action.payload.onError,
                    error: TypeError(`Cannot read property 'ok' of undefined`),
                }));
            expect(fetchSagaGen.next().done)
                .toBe(true);
        });
    });
});
