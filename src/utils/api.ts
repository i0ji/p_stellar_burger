import {createAsyncThunk} from "@reduxjs/toolkit";
import {Dispatch} from "@reduxjs/toolkit";

import {BASE_URL} from "utils/routs.ts";
import {setAuthChecked, setUser} from "slices/authSlice.ts";
import {checkResponse} from "utils/check-response.ts";

import {IRequestOptions} from "interfaces/interfaces";
import {IUserData} from "interfaces/sliceInterfaces";




// --------------- REFRESH ---------------

export const refreshToken = async () => {
    const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    const refreshData = await checkResponse(response);
    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
};


// --------------- FETCH WITH REFRESH ---------------

export const fetchWithRefresh = async (url: URL, options:IRequestOptions) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


// --------------- LOGIN ---------------

export const getUser = createAsyncThunk('auth/login',
    async (userData: IUserData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, requestOptions);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.user;
        } catch (error) {
            throw error;
        }
    });


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
                const response = await fetch(`${BASE_URL}/auth/user`, {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (!response.ok) {
                    await dispatch(refreshToken());
                }

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

export const logoutUser = createAsyncThunk('auth/logoutUser', async (refreshTokenValue) => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: refreshTokenValue,
        }),
    });

    const logoutData = await checkResponse(response);

    console.log(response)

    if (!logoutData.success) {
        return Promise.reject(logoutData);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return logoutData;
});