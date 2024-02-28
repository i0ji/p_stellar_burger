import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkResponse} from 'utils/check-response.ts';
import {BASE_URL} from 'utils/routs.ts';

import {IUserData} from "interfaces/sliceInterfaces";

// --------------- REFRESH ---------------
export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
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
                const refreshData = await refreshToken();
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
const getUser = createAsyncThunk('auth/login', async (userData: IUserData) => {
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


// --------------- RESET PASSWORD ---------------
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (password: string, token: string) => {
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

// --------------- AUTH CHECK ---------------
export const checkUserAuth = () => {
    return async (dispatch) => {
        if (localStorage.getItem('accessToken')) {
            try {
                await dispatch(getUser);
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


// --------------- AUTH SLICE  ---------------
const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
        isAuth: false,
        authChecked: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuth = !!action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.user = null;
            state.isAuth = false;
            state.status = 'idle';
        },
        setAuthChecked(state, action) {
            state.authChecked = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export const {setAuthChecked, setUser, logout} = authSlice.actions;

export {getUser};

export default authSlice.reducer;


// .addCase(refreshToken.fulfilled, (state, action) => {
//     // Обработка успешного обновления токена
// })
// .addCase(fetchWithRefreshThunk.fulfilled, (state, action) => {
//     // Обработка успешного запроса с обновленным токеном
// })
// .addCase(resetPassword.fulfilled, (state, action) => {
//     // Обработка успешного сброса пароля
// })
// .addCase(registerUser.fulfilled, (state, action) => {
//     // Обработка успешной регистрации пользователя
// })
// .addCase(forgotPassword.fulfilled, (state, action) => {
//     // Обработка успешного запроса на восстановление пароля
// })