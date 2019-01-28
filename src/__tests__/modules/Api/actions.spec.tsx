import { http_request } from '../../../modules/Api/actions';
import { CALL } from '../../../modules/Api/actionTypes';
import { HttpRequestData } from '../../../modules/Api/model';

describe('Api actions should', () => {

    let testData: HttpRequestData;

    beforeEach(() => testData = {
        data: 'testData',
        loadingKey: 'testLoadingKey',
        resource: 'testResource',
    });

    describe('create http request', () => {
        it('POST', () =>
            expect(http_request.post(testData)).toEqual({
                payload: {
                    data: 'testData',
                    loadingKey: 'testLoadingKey',
                    resource: 'testResource',
                    tokenRequired: true,
                    method: 'POST',
                },
                type: CALL,
            }));
        it('GET', () =>
            expect(http_request.get(testData)).toEqual({
                payload: {
                    data: 'testData',
                    loadingKey: 'testLoadingKey',
                    resource: 'testResource',
                    tokenRequired: true,
                    method: 'GET',
                },
                type: CALL,
            }));
        it('PUT', () =>
            expect(http_request.put(testData)).toEqual({
                payload: {
                    data: 'testData',
                    loadingKey: 'testLoadingKey',
                    resource: 'testResource',
                    tokenRequired: true,
                    method: 'PUT',
                },
                type: CALL,
            }));
        it('DELETE', () =>
            expect(http_request.delete(testData)).toEqual({
                payload: {
                    data: 'testData',
                    loadingKey: 'testLoadingKey',
                    resource: 'testResource',
                    tokenRequired: true,
                    method: 'DELETE',
                },
                type: CALL,
            }));
    });
});
