import { createSelector } from 'reselect';
import { IAppState } from '../../model';
import { IAuthState } from './model';

const getAuthState = (state: IAppState): IAuthState => state.auth;

export const getToken = createSelector(
    getAuthState,
    (state: IAuthState) => state.token,
);

export const hasToken = createSelector(
    getToken,
    (token: string | null) => Boolean(token),
);
