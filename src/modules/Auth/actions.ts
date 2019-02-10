import { LOGIN, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from './actionTypes';
import { ILoginPayload } from './model';

const setToken = (token: string) => ({
    type: SET_TOKEN,
    payload: {
        token,
    },
});

const removeToken = () => ({
    type: REMOVE_TOKEN,
});

const login = (data: ILoginPayload) => ({
    type: LOGIN,
    payload: data,
});

const logout = () => ({
    type: LOGOUT,
});

export { logout, login, removeToken, setToken };
