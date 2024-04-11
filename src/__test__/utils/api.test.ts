// import fetchMock from 'jest-fetch-mock';
// import {
//     createOrder,
//     checkUserAuth,
//     getConcreteOrder,
//     refreshToken,
//     fetchWithRefresh,
//     loginUser,
//     getUserData,
//     getIngredients,
//     updateUserData,
//     registerUser,
//     resetPassword,
//     forgotPassword,
//     logoutUser,
// } from 'utils/api.ts';
// import {BASE_URL, ORDER_URL} from 'declarations/routs.ts';
//
//
// jest.mock('utils/checkResponse.ts');
//
// describe('refreshToken', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should refresh token', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({accessToken: 'newToken', refreshToken: 'newRefreshToken'}));
//         const result = await refreshToken();
//         expect(result).toEqual({accessToken: 'newToken', refreshToken: 'newRefreshToken'});
//         expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/auth/token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//             },
//             body: JSON.stringify({
//                 token: localStorage.getItem('refreshToken'),
//             }),
//         });
//     });
// });
//
// describe('fetchWithRefresh', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//         jest.spyOn(global, 'fetch').mockResolvedValue({ok: true, json: () => Promise.resolve({data: 'test'})});
//     });
//
//     it('should fetch data with refresh token', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({accessToken: 'newToken', refreshToken: 'newRefreshToken'}));
//         const result = await fetchWithRefresh('url', {});
//         expect(result).toEqual({data: 'test'});
//     });
//
//     it('should throw error if fetch fails', async () => {
//         fetchMock.mockRejectOnce(new Error('Fetch failed'));
//         await expect(fetchWithRefresh('url', {})).rejects.toThrowError('Fetch failed');
//     });
// });
//
// describe('loginUser', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should login user', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({accessToken: 'token', refreshToken: 'refreshToken', user: {}}));
//         const result = await loginUser({name: 'test', password: 'password'});
//         expect(result).toEqual({});
//         expect(localStorage.getItem('accessToken')).toBe('token');
//         expect(localStorage.getItem('refreshToken')).toBe('refreshToken');
//     });
// });
//
//
// describe('getUserData', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should get user data', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({user: {}}));
//         const result = await getUserData();
//         expect(result).toEqual({});
//         expect(fetchWithRefresh).toHaveBeenCalledWith(`${BASE_URL}/auth/user`, {
//             headers: {
//                 Authorization: localStorage.getItem('accessToken'),
//             },
//         });
//     });
//
//     it('should throw error if token is missing', async () => {
//         localStorage.removeItem('accessToken');
//         await expect(getUserData()).rejects.toThrowError('Не найден токен доступа!');
//     });
// });
//
// describe('getIngredients', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should get ingredients', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({success: true, data: [{id: 1, name: 'Ingredient 1'}]}));
//         const result = await getIngredients();
//         expect(result).toEqual([{id: 1, name: 'Ingredient 1'}]);
//         expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/ingredients`);
//     });
//
//     it('should throw error if response is not successful', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({success: false}));
//         await expect(getIngredients()).rejects.toThrowError('Ошибка при загрузке ингредиентов!');
//     });
// });
//
// describe('updateUserData', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should update user data', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({user: {}}));
//         const result = await updateUserData({});
//         expect(result).toEqual({});
//         expect(fetchWithRefresh).toHaveBeenCalledWith(`${BASE_URL}/auth/user`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: localStorage.getItem('accessToken'),
//             },
//             body: '{}',
//         });
//     });
//
//     it('should throw error if token is missing', async () => {
//         localStorage.removeItem('accessToken');
//         await expect(updateUserData({})).rejects.toThrowError('Нет токена доступа!');
//     });
// });
//
// describe('registerUser', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should register user', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({accessToken: 'token', refreshToken: 'refreshToken'}));
//         const result = await registerUser({});
//         expect(result).toEqual({accessToken: 'token', refreshToken: 'refreshToken'});
//         expect(localStorage.getItem('accessToken')).toBe('token');
//         expect(localStorage.getItem('refreshToken')).toBe('refreshToken');
//     });
//
//     it('should reject if registration fails', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({success: false}));
//         await expect(registerUser({})).rejects.toEqual({success: false});
//     });
// });
//
//
// describe('resetPassword', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should reset password', async () => {
//         const requestBody = {password: 'newPassword', token: 'resetToken'};
//         fetchMock.mockResponseOnce(JSON.stringify({success: true}));
//         const result = await resetPassword('newPassword', 'resetToken');
//         expect(result).toEqual({success: true});
//         expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/password-reset/reset`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody),
//         });
//     });
//
//     it('should throw error if reset fails', async () => {
//         fetchMock.mockRejectOnce(new Error('Reset failed'));
//         await expect(resetPassword('newPassword', 'resetToken')).rejects.toThrowError('Reset failed');
//     });
// });
//
// describe('forgotPassword', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should send forgot password request', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({success: true}));
//         const result = await forgotPassword('test@example.com');
//         expect(result).toEqual({success: true});
//         expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/password-reset`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({email: 'test@example.com'}),
//         });
//     });
//
//     it('should throw error if request fails', async () => {
//         fetchMock.mockRejectOnce(new Error('Request failed'));
//         await expect(forgotPassword('test@example.com')).rejects.toThrowError('Request failed');
//     });
// });
//
// describe('logoutUser', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should logout user', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({success: true}));
//         const result = await logoutUser('refreshToken');
//         expect(result).toEqual({success: true});
//         expect(localStorage.getItem('accessToken')).toBeNull();
//         expect(localStorage.getItem('refreshToken')).toBeNull();
//         expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/auth/logout`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//             },
//             body: JSON.stringify({
//                 token: 'refreshToken',
//             }),
//         });
//     });
//
//     it('should throw error if logout fails', async () => {
//         fetchMock.mockRejectOnce(new Error('Logout failed'));
//         await expect(logoutUser('refreshToken')).rejects.toThrowError('Logout failed');
//     });
// });
//
// describe('createOrder', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should create an order', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({order: {number: 123}}));
//         const result = await createOrder(['1', '2', '3']);
//         expect(result).toBe(123);
//         expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/orders`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'accessToken',
//             },
//             body: JSON.stringify({ingredients: ['1', '2', '3']}),
//         });
//     });
// });
//
// describe('checkUserAuth', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//         localStorage.setItem('accessToken', 'token');
//     });
//
//     it('should check user authentication and set user if authenticated', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({id: 1, username: 'testUser'}));
//         const dispatch = jest.fn();
//         await checkUserAuth()(dispatch);
//         expect(fetchMock).toHaveBeenCalledTimes(2);
//         expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
//     });
//
//     it('should remove tokens and set user to null if authentication fails', async () => {
//         fetchMock.mockRejectOnce(new Error('Authentication failed'));
//         const dispatch = jest.fn();
//         await checkUserAuth()(dispatch);
//         expect(localStorage.getItem('accessToken')).toBeNull();
//         expect(localStorage.getItem('refreshToken')).toBeNull();
//         expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
//     });
// });
//
// describe('getConcreteOrder', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });
//
//     it('should get a specific order', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({id: '123', items: ['item1', 'item2']}));
//         const result = await getConcreteOrder('123');
//         expect(result).toEqual({id: '123', items: ['item1', 'item2']});
//         expect(fetchMock).toHaveBeenCalledWith(`${ORDER_URL}/123`);
//     });
//
//     it('should throw an error if order retrieval fails', async () => {
//         fetchMock.mockRejectOnce(new Error('Failed to retrieve order'));
//         await expect(getConcreteOrder('456')).rejects.toThrowError('Failed to retrieve order');
//         expect(fetchMock).toHaveBeenCalledWith(`${ORDER_URL}/456`);
//     });
// });