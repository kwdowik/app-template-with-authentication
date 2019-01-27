import { login, logout, removeToken, setToken } from '../../../modules/Auth/actions';
import { LOGIN, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from '../../../modules/Auth/actionTypes';

describe('Auth actions should', () => {
    it('set token return SET_TOKEN action', () =>
        expect(setToken('testToken'))
        .toEqual({
            type: SET_TOKEN,
            payload: {
                token: 'testToken',
            },
        }));
    it('remove token return REMOVE_TOKEN action', () =>
        expect(removeToken())
        .toEqual({
            type: REMOVE_TOKEN,
        }));
    it('login return LOGIN action', () =>
        expect(login({email: 'testEmail', password: 'testPassword'}))
        .toEqual({
            type: LOGIN,
            payload: {
                email: 'testEmail',
                password: 'testPassword',
            },
        }));
    it('logout return LOGOUT action', () =>
        expect(logout())
        .toEqual({
            type: LOGOUT,
        }));
});
