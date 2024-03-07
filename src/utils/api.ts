import {createAsyncThunk} from "@reduxjs/toolkit";
import {Dispatch} from "@reduxjs/toolkit";

import {BASE_URL} from "declarations/routs.ts";
import {setAuthChecked, setUser} from "slices/authSlice.ts";
import {checkResponse} from "utils/check-response.ts";

import {IUserData} from "declarations/sliceInterfaces";
import {TIngredientResponse, TRefreshToken, TUserLoginResponse} from "declarations/types";

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
    }).then(res => checkResponse<TRefreshToken>(res));
};


// --------------- FETCH WITH REFRESH ---------------

interface RefreshData {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if ((err as { message: string }).message === "jwt expired") {
            const refreshData: RefreshData = await refreshToken();
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

// export const loginUser = createAsyncThunk('auth/login',
//     async (userData: IUserData) => {
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         };
//         try {
//             const response = await fetch(`${BASE_URL}/auth/login`, requestOptions)
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             const data = await response.json();
//             localStorage.setItem('accessToken', data.accessToken);
//             localStorage.setItem('refreshToken', data.refreshToken);
//             return data.user;
//         } catch (error) {
//             throw error;
//         }
//     });




export const loginUser = createAsyncThunk(
    'auth/login',
    async () => {
        const response = await fetch(`${BASE_URL}/auth/login`);
        const data = await checkResponse<TUserLoginResponse>(response);
        if (data?.success) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.user;
        } else
        throw new Error('Ошибка при авторизации');
    })


// --------------- GET USER DATA ---------------

export const getUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Access token not found');
        }
        try {
            const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.user;
        } catch (error) {
            throw error;
        }
    }
);


// --------------- GET INGREDIENTS ---------------

export const getIngredients = createAsyncThunk('ingredientsListSlice/fetchIngredients', async () => {
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

        const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении данных пользователя');
        }

        const data = await response.json();
        return data.user;
    }
);


// --------------- REGISTER ---------------

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: IUserData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
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
        console.log('Logout response:', response);
        const logoutData = await checkResponse(response);
        console.log('Logout data:', logoutData);
        if (!logoutData.success) {
            console.error('Logout failed:', logoutData);
            return Promise.reject(logoutData);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('Пользователь вышел!');
        return logoutData;
    });


// --------------- CREATE ORDER ---------------

export const createOrder = createAsyncThunk('orderSlice/createOrder', async (ingredientIds: string[]) => {
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
    const data = await (checkResponse(response))
    return data.order.number;
});


//
//
// type TSererResponse<T> = {
//     success: boolean;
// } & T
//
// type TIngredientsResponse = TSererResponse<<any>>