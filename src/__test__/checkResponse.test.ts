import {checkResponse} from "utils/checkResponse.ts";

describe("checkResponse()", () => {

    test("should return success", () => {
        const testRes: Partial<Response> = {
            ok: true,
            json: jest.fn().mockResolvedValue({ result: 'OK' })
        };

        const result = checkResponse(testRes as Response);
        return expect(result).resolves.toEqual({ result: 'OK' });
    });

    test("should return fail",  async () => {
        const errorResponse: Partial<Response> = {
            ok: false,
            status: 400,
            json: jest.fn().mockRejectedValue({ message: 'Error occurred' })
        };

        const resultPromise = checkResponse(errorResponse as Response);
        return await expect(resultPromise).rejects.toEqual(400);
    });
});