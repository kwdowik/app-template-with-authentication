import { IAuthState } from './model';

export const hasToken = (state: IAuthState) => Boolean(state.token);
