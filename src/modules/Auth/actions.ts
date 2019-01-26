import { LOGIN, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from './actionTypes';
import { ILoginPayload } from './model';

export const setToken = (token: string) => ({
    type: SET_TOKEN,
    payload: {
        data: token,
    },
});

export const removeToken = () => ({
    type: REMOVE_TOKEN,
});

export const login = (data: ILoginPayload) => ({
    type: LOGIN,
    payload: data,
});

export const logout = () => ({
    type: LOGOUT,
});
