import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkResponse} from 'utils/check-response.ts';
import {BASE_URL} from 'utils/routs.ts';

import {IUserData} from "interfaces/sliceInterfaces";

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


const loginAsync = createAsyncThunk('auth/login', async (userData: IUserData) => {
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
export const resetPasswordThunk = createAsyncThunk(
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


// --------------- AUTH SLICE  ---------------

const authSlice = createSlice({
	name: 'authSlice',
	initialState: {
		user: null,
		status: 'idle',
		error: null,
		isAuth: false,
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.isAuth = !!action.payload;
			state.isAuth = true;
		},
		logout: (state) => {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			state.user = null;
			state.isAuth = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
				state.error = null;
				state.isAuth = true;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {setUser, logout} = authSlice.actions;

export {loginAsync};

export default authSlice.reducer;


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