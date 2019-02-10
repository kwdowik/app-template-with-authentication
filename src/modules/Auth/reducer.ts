import { AnyAction, Reducer } from 'redux';
import { IAuthState } from '.';
import { REMOVE_TOKEN, SET_TOKEN } from './actionTypes';

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
       default:
        return state;
    }
 };
