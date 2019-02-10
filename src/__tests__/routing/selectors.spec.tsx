import { IAppState } from '../../model';
import { isUserAuthorized } from '../../routing/selectors';

describe('Router selectors should', () => {
    let fakeAppState: IAppState;

    beforeEach(() => {
        fakeAppState = {
            auth: {
                token: null,
            },
        } as IAppState;
    });

    it('check if user is authorized', () =>
        expect(isUserAuthorized({...fakeAppState, auth: { token: 'testToken'}})).toBe(true));

    it('check if user is unauthorized', () =>
        expect(isUserAuthorized(fakeAppState)).toBe(false));
});
