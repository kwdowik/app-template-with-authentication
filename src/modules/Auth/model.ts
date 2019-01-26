export interface IAuthState {
    isLoggedIn: boolean;
    token: string | null;
}

export interface ILoginPayload {
    email: string;
    password: string;
}
