import { IAuthState, reducer } from '../../../modules/Auth';
import { LOGIN_FAILED, LOGIN_SUCCEED, REMOVE_TOKEN, SET_TOKEN } from '../../../modules/Auth/actionTypes';

describe('Auth reducers should', () => {
    let fakeAuthState: IAuthState;

    beforeEach(() => {
        fakeAuthState = {
            isError: false,
            isLoggedIn: false,
            token: 'testToken',
        };
    });

    it('return initial state', () => {
        const action = {
            type: 'unknown',
        };

        expect(reducer(fakeAuthState, action))
            .toEqual(fakeAuthState);
    });

    it('SET_TOKEN', () => {
        const action = {
            type: SET_TOKEN,
            payload: {
                token: 'newTestToken',
            },
        };

        expect(reducer(fakeAuthState, action))
            .toEqual({...fakeAuthState, token: 'newTestToken' });
    });

    it('REMOVE_TOKEN', () => {
        const action = {
            type: REMOVE_TOKEN,
        };

        expect(reducer(fakeAuthState, action))
            .toEqual({...fakeAuthState, token: null });
    });

    it('LOGIN_SUCCEED', () => {
        const action = {
            type: LOGIN_SUCCEED,
        };

        expect(reducer(fakeAuthState, action))
            .toEqual({...fakeAuthState, isError: false, isLoggedIn: true });
    });

    it('LOGIN_FAILED', () => {
        const action = {
            type: LOGIN_FAILED,
        };

        expect(reducer(fakeAuthState, action))
            .toEqual({...fakeAuthState, isError: true, isLoggedIn: false });
    });
});
