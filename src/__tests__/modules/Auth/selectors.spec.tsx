import { IAppState } from '../../../model';
import { getToken, hasToken } from '../../../modules/Auth';
import { isInvalidCredentials } from '../../../modules/Auth/selectors';

describe('Auth selectors should', () => {
    let fakeAppState: IAppState;

    beforeEach(() => {
        fakeAppState = {
            auth: {
                isLoggedIn: false,
                token: 'testToken',
                isError: true,
            },
        } as IAppState;
    });

    it('get token', () =>
        expect(getToken(fakeAppState)).toBe('testToken'));

    it('check if token is assigned', () =>
        expect(hasToken(fakeAppState)).toBe(true));

    it('is invalid credentails', () =>
        expect(isInvalidCredentials(fakeAppState)).toBe(true));
});
