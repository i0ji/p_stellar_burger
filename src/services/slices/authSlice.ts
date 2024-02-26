import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkResponse} from 'utils/check-response.ts';
import {BASE_URL} from 'utils/routs.ts';

import {PasswordResponseTypes} from "utils/customTypes";

// --------------- REFRESH ---------------


export const refreshTokenThunk = createAsyncThunk('auth/refreshToken', async () => {
    const response = await fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });

    const refreshData = await checkResponse(response);

    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }

    localStorage.setItem('refreshToken', refreshData.refreshToken);
    localStorage.setItem('accessToken', refreshData.accessToken);


    return refreshData;
});


// --------------- FETCH WITH REFRESH ---------------

export const fetchWithRefreshThunk = createAsyncThunk(
    'auth/fetchWithRefresh',
    async (url: URL, options) => {
        try {
            const res = await fetch(url, options);
            return await checkResponse(res);
        } catch (err) {
            if (err.message === 'jwt expired') {
                const refreshData = await refreshTokenThunk();
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options);
                return await checkResponse(res);
            } else {
                return Promise.reject(err);
            }
        }
    }
);


// --------------- LOGIN ---------------

interface IUserData {
    email: string,
    password: string,
    success?: boolean,
    refreshToken?: string,
    user?: {
        email: string,
        name: string
    }
}

const loginAsync = createAsyncThunk('auth/login', (userData: IUserData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    };


    return fetch(`${BASE_URL}/auth/login`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.user;
        })
        .catch((error) => {
            throw error;
        });
});


// --------------- RESET PASSWORD ---------------
export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async (password: string, token: string): Promise<PasswordResponseTypes> => {
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
    }
);


// --------------- REGISTER ---------------

export const registerUserThunk = createAsyncThunk(
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


// --------------- FORGOT PASSWORD ---------------

export const forgotPasswordThunk = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string): Promise<PasswordResponseTypes> => {
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


// --------------- AUTH SLICE  ---------------

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
        isAuth: false,
        authStatus: 'idle',
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuth = !!action.payload;
        },
        setAuthStatus(state, action) {
            state.authStatus = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(refreshTokenThunk.fulfilled, (state, action) => {
            //     // Обработка успешного обновления токена
            // })
            // .addCase(fetchWithRefreshThunk.fulfilled, (state, action) => {
            //     // Обработка успешного запроса с обновленным токеном
            // })
            // .addCase(resetPasswordThunk.fulfilled, (state, action) => {
            //     // Обработка успешного сброса пароля
            // })
            // .addCase(registerUserThunk.fulfilled, (state, action) => {
            //     // Обработка успешной регистрации пользователя
            // })
            // .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
            //     // Обработка успешного запроса на восстановление пароля
            // })
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {setUser, setAuthStatus, logout} = authSlice.actions;

export {loginAsync};

export default authSlice.reducer;