import { IAuthState, reducer } from '../../../modules/Auth';
import { REMOVE_TOKEN, SET_TOKEN } from '../../../modules/Auth/actionTypes';

describe('Auth reducers should', () => {
    let fakeAuthState: IAuthState;

    beforeEach(() => {
        fakeAuthState = {
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
            .toEqual({...fakeAuthState, token: 'newTestToken', isLoggedIn: true});
    });

    it('REMOVE_TOKEN', () => {
        const action = {
            type: REMOVE_TOKEN,
        };

        expect(reducer(fakeAuthState, action))
            .toEqual({...fakeAuthState, token: null, isLoggedIn: false});
    });
});
