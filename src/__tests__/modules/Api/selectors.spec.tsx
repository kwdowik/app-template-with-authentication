import { keys } from 'lodash';
import { IAppState } from '../../../model';
import { getAllRequests, getRequest } from '../../../modules/Api';
import { IAuthState } from '../../../modules/Auth';

describe('Auth selectors should', () => {
    let fakeAppState: IAppState;

    beforeEach(() => {
        fakeAppState = {
            api: {
                requests: {
                    1: {
                        id: '1',
                        isError: false,
                        isLoading: false,
                    },
                    2: {
                        id: '2',
                        isError: true,
                        isLoading: false,
                    },
                 },
                 token: 'testToken',
            },
            auth: {} as IAuthState,
        } as IAppState;
    });

    it('get all requests', () =>
        expect(keys(getAllRequests(fakeAppState)).length).toBe(2));

    it('get request', () =>
        expect(getRequest('2')(fakeAppState)).toEqual({
            id: '2',
            isError: true,
            isLoading: false,
        }));

});
