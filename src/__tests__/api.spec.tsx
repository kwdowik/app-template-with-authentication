import { api } from '../api';

describe('api should', () => {
    let response: Response = {} as Response;

    beforeEach(() => {
        response = {
            ok: false,
            headers: [['header01', 'header02']] as any,
            status: 404,
            json: () => Promise.resolve('testJson'),
        } as Response;
    });

    it('invoke callback method when fetchData has been invoked', async () => {
        const args = ['arg1', 'arg2'];
        const cb = jest.fn(() => new Promise(() => 'fake'));
        api.fetchData(cb)(args);

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('create response object from createHttpResponseObjAsync - ok is false', async () => {
        if (api.createHttpResponseObjAsync !== undefined) {
            expect(await api.createHttpResponseObjAsync(response))
                .toEqual({
                    ok: false,
                    data: {
                        code: 404,
                    },
                });
        }
    });

    it('create respone object from createHttpResponseObjAsync - ok is true', async () => {
        if (api.createHttpResponseObjAsync !== undefined) {
            expect(await api.createHttpResponseObjAsync({...response, ok: true}))
                .toEqual({
                    ok: true,
                    data: {
                        code: 404,
                        payload: 'testJson',
                        headers: {
                            0: ['header01', 'header02'],
                        },
                    },
                });
        }
    });

    it('create response object from createHttpResponseExceptionObj', async () => {
        if (api.createHttpResponseExceptionObj !== undefined) {
            expect(await api.createHttpResponseExceptionObj({code: 500, error: 'testError'}))
                .toEqual({
                    ok: false,
                    data: {
                        code: 500,
                        error: 'testError',
                    },
                });
        }
    });

    it('create response object from createHttpResponseExceptionObj - default valus', async () => {
        if (api.createHttpResponseExceptionObj !== undefined) {
            expect(await api.createHttpResponseExceptionObj({} as any))
                .toEqual({
                    ok: false,
                    data: {
                        code: -1,
                        error: 'Error has been occured during fetch data',
                    },
                });
        }
    });
});
