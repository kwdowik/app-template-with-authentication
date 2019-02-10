import { IAppState } from '../../../model';
import { getToken, hasToken } from '../../../modules/Auth';

describe('Auth selectors should', () => {
    let fakeAppState: IAppState;

    beforeEach(() => {
        fakeAppState = {
            auth: {
                token: 'testToken',
            },
        } as IAppState;
    });

    it('get token', () =>
        expect(getToken(fakeAppState)).toBe('testToken'));

    it('check if token is assigned', () =>
        expect(hasToken(fakeAppState)).toBe(true));

});
