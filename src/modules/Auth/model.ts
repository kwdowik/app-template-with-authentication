export interface IAuthState {
    isLoggedIn: boolean;
    token: string | null;
    isError: boolean;
}

export interface ILoginPayload {
    email: string;
    password: string;
}
