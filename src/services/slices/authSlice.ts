import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {checkResponse} from 'utils/check-response.ts';
import {BASE_URL} from 'utils/routs.ts';
import {IUserData} from 'interfaces/sliceInterfaces';
import {useNavigate} from "react-router-dom";


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

export const loginAsync = createAsyncThunk('auth/login', async (credentials, {rejectWithValue}) => {
    try {
        const response = await loginUserApi(credentials);

        const navigate = useNavigate();

        if (response.success) {
            // Сохранение токенов в localStorage или куки
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            navigate('/');

            return response.user;
        } else {
            return rejectWithValue(response.message);
        }
    } catch (error) {
        return rejectWithValue('Ошибка при выполнении запроса');
    }
});


// --------------- RESET PASSWORD ---------------
export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async (password: string, token: string): Promise<any> => {
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
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);


// --------------- FORGOT PASSWORD ---------------

export const forgotPasswordThunk = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string): Promise<any> => {
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
    name: 'auth',
    initialState: {
        // Ваше начальное состояние, если необходимо
    },
    reducers: {
        // Дополнительные редьюсеры, если требуется
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                // Обработка успешного обновления токена
            })
            .addCase(fetchWithRefreshThunk.fulfilled, (state, action) => {
                // Обработка успешного запроса с обновленным токеном
            })
            .addCase(resetPasswordThunk.fulfilled, (state, action) => {
                // Обработка успешного сброса пароля
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                // Обработка успешной регистрации пользователя
            })
            .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
                // Обработка успешного запроса на восстановление пароля
            });
    },
});

export default authSlice.reducer;
export const {} = authSlice.actions;