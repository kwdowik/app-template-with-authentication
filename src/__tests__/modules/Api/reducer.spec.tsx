import { keys, omit } from 'lodash';
import { IApiState, reducer } from '../../../modules/Api';
import { ADD_REQUEST, RESOLVE_REQUEST } from '../../../modules/Api/actionTypes';

describe('Api reducer should', () => {
    let fakeApiState: IApiState;

    beforeEach(() => {
        fakeApiState = {
            requests: {
               1: {
                    id: '1',
                    isError: false,
                    isLoading: false,
                },
                2: {
                    id: '2',
                    isError: true,
                    isLoading: false,
                },
            },
            token: 'testToken',
        };
    });

    it('return initial state', () => {
        const action = {
            type: 'unknown',
        };

        expect(reducer(fakeApiState, action))
            .toEqual(fakeApiState);
    });

    it('ADD_REQUEST', () => {
        const action = {
            type: ADD_REQUEST,
            payload: {
                id: '3',
                isError: false,
                isLoading: true,
            },
        };

        const state = reducer(fakeApiState, action);

        expect(keys(state.requests).length).toBe(3);
        expect(state).toEqual({
            ...fakeApiState,
            requests: {
                ...fakeApiState.requests,
                [action.payload.id]: action.payload,
            }});
    });

    it('RESOLVE_REQUEST', () => {
        const action = {
            type: RESOLVE_REQUEST,
            payload: {
                id: '2',
                isError: false,
                isLoading: false,
            },
        };

        const state = reducer(fakeApiState, action);

        expect(keys(state.requests).length).toBe(1);
        expect(state).toEqual({
            ...fakeApiState,
            requests: omit(
                state.requests,
                [action.payload.id],
            )});
    });

    it('RESOLVE_REQUEST - with error', () => {
        const action = {
            type: RESOLVE_REQUEST,
            payload: {
                id: '2',
                isError: true,
                isLoading: false,
            },
        };

        const state = reducer(fakeApiState, action);

        expect(keys(state.requests).length).toBe(2);
        expect(state).toEqual({
            ...fakeApiState,
            requests: {
                ...fakeApiState.requests,
                [action.payload.id]: action.payload,
            }});
    });
});
