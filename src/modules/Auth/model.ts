import { ILoading } from '../../model';

export interface IAuthState {
    token: string | null;
}

export interface ILoginPayload extends ILoading {
    email: string;
    password: string;
}
