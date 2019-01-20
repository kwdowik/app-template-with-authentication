import { IApiState } from './modules/Api';
import { IAuthState } from './modules/Auth';

export interface IAppState {
    auth: IAuthState;
    api: IApiState;
}
