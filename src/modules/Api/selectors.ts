import { createSelector } from 'reselect';
import { IAppState, IDictionary } from '../../model';
import { IApiState, IRequestState } from './model';

const getAuthState = (state: IAppState): IApiState => state.api;

export const getAllRequests = createSelector(
    getAuthState,
    (state: IApiState) => state.requests,
);

export const getRequest = (key: string) => createSelector(
    getAllRequests,
    (requests: IDictionary<IRequestState>): IRequestState => requests[key],
);
