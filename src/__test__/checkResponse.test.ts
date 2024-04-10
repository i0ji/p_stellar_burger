import {checkResponse} from 'utils/checkResponse';

describe('checkResponse function', () => {
    it('should resolve', async () => {
        const responseData = { message: 'Success' };
        const response = {
            ok: true,
            json: () => Promise.resolve(responseData)
        } as Response;
        const result = await checkResponse(response);
        expect(result).toEqual(responseData);
    });

    it('should reject', async () => {
        const response = {
            ok: false,
            json: () => Promise.resolve({ status: 404 })
        } as Response;
        await expect(checkResponse(response)).rejects.toEqual(404);
    });
});