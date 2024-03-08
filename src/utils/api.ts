import {createAsyncThunk} from "@reduxjs/toolkit";
import {Dispatch} from "@reduxjs/toolkit";

import {BASE_URL} from "declarations/routs.ts";
import {setAuthChecked, setUser} from "slices/authSlice.ts";
import {checkResponse} from "utils/check-response.ts";

import {IUserData, IRefreshData, IOrderSlice} from "declarations/sliceInterfaces";
import {TIngredientResponse, TToken, TUserLoginResponse} from "declarations/types";
import {IIngredient} from "declarations/interfaces";

// --------------- REFRESH ---------------

export const refreshToken = async () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(res => checkResponse<TToken>(res));
};


// --------------- FETCH WITH REFRESH ---------------

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if ((err as { message: string }).message === "jwt expired") {
            const refreshData: IRefreshData = await refreshToken();
            if (!refreshData.success) {
                await Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('refreshToken', refreshData.accessToken);
            const res = await fetch(url, options);
            return await checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};


// --------------- login ---------------

export const loginUser = createAsyncThunk<IUserData, IUserData>('auth/login',
    async (userData: IUserData): Promise<IUserData> => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(`${BASE_URL}/auth/login`, requestOptions)
        const data = await checkResponse<TUserLoginResponse>(response);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.user;
    });

// --------------- GET USER DATA ---------------TS2345: Argument of type 'AsyncThunkAction<readonly IIngredient[], void, AsyncThunkConfig>' is not assignable to parameter of type 'UnknownAction'.

export const getUserData = createAsyncThunk(
    'user/fetchUserData',
    async ():Promise<IUserData> => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Не найден токен доступа!');
        }
        const response = await fetchWithRefresh<IUserData>(
            `${BASE_URL}/auth/user`,
            {
                headers: {
                    Authorization: token,
                },
            });
        console.log(`RESPONSE DATA: ${response.user}`)
        return response.user;
    }
);


// --------------- GET INGREDIENTS ---------------

export const getIngredients = createAsyncThunk<ReadonlyArray<IIngredient>>(
    'ingredientsListSlice/fetchIngredients',
    async (): Promise<ReadonlyArray<IIngredient>> => {
        const response = await fetch(`${BASE_URL}/ingredients`);
        const data = await checkResponse<TIngredientResponse>(response);
        if (data?.success) return data.data;
        throw new Error('Ошибка при загрузке ингредиентов!');
    });


// --------------- UPDATE USER DATA ---------------

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (updatedData) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Нет токена доступа!');
        }
        const response = await fetchWithRefresh(
            `${BASE_URL}/auth/user`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(updatedData),
            });
        return checkResponse(response);
    }
);


// --------------- REGISTER ---------------

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: IUserData) => {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    }
);


// --------------- RESET PASSWORD ---------------

export const resetPassword = async (password: string, token: string) => {
    const requestBody = {
        password: password,
        token: token,
    };

    try {
        const response = await fetch(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        return await response.json();
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};


// --------------- FORGOT PASSWORD ---------------

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string) => {
        const requestBody = {
            email: email,
        };

        try {
            const response = await fetch(`${BASE_URL}/password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            return await response.json();
        } catch (error) {
            console.error('Error during password reset:', error);
            throw error;
        }
    }
);

export const checkUserAuth = () => {
    return async (dispatch: Dispatch) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                await fetch(`${BASE_URL}/auth/user`, {
                    headers: {
                        Authorization: accessToken,
                    },
                }).then(checkResponse)
                const userResponse = await fetch(`${BASE_URL}/auth/user`, {
                    headers: {
                        Authorization: accessToken,
                    },
                });
                if (userResponse.ok) {
                    const userData = await userResponse.json();

                    dispatch(setUser(userData));
                }
            } catch (error) {
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
                dispatch(setUser(null));
            } finally {
                dispatch(setAuthChecked(true));
            }
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


// --------------- LOGOUT ---------------

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (refreshToken) => {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: refreshToken,
            }),
        });
        const logoutData = await checkResponse(response);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return logoutData;
    });


// --------------- CREATE ORDER ---------------

export const createOrder = createAsyncThunk<IOrderSlice, string[]>(
    'orderSlice/createOrder',
    async (ingredientIds: string[]): Promise<IOrderSlice> => {
        const requestBody = {
            ingredients: ingredientIds
        };
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        const data = await (checkResponse(response));
        return data.order.number;
    });