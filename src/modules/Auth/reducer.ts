import { AnyAction, Reducer } from 'redux';
import { IAuthState } from '.';
import { LOGIN_FAILED, LOGIN_SUCCEED, REMOVE_TOKEN, SET_TOKEN } from './actionTypes';

const initial: IAuthState = { } as IAuthState;

export const reducer: Reducer<IAuthState> = (state: IAuthState = initial, action: AnyAction): IAuthState => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            };
        case REMOVE_TOKEN:
            return {
                ...state,
                token: null,
            };
        case LOGIN_SUCCEED:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
            };
       default:
        return state;
    }
 };
