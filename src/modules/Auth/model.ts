import { ILoading } from '../../model';

export interface IAuthState {
    isLoggedIn: boolean;
    token: string | null;
}

export interface ILoginPayload extends ILoading {
    email: string;
    password: string;
}
