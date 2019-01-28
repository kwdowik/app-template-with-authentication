import { omit } from 'lodash';
import { AnyAction, Reducer } from 'redux';
import { IApiState } from '.';
import { ADD_REQUEST, RESOLVE_REQUEST } from './actionTypes';

const initial: IApiState = {requests: {}} as IApiState;

export const reducer: Reducer<IApiState> = (state: IApiState = initial, action: AnyAction) => {
    switch (action.type) {
        case ADD_REQUEST:
            return {
                ...state,
                requests: {...state.requests, [action.payload.id]: action.payload },
            };
        case RESOLVE_REQUEST:
            return {
                ...state,
                requests: action.payload.isError
                ?   {
                        ...state.requests,
                        [action.payload.id]: action.payload,
                    }
                :   omit(
                        state.requests,
                        [action.payload.id],
                    ),
            };
        default:
            return state;
    }
 };
