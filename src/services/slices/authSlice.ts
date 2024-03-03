import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkResponse} from 'utils/check-response.ts';
import {BASE_URL} from 'utils/routs.ts';
import {getUser, registerUser, logoutUser} from "utils/api.ts"

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
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'idle';
                state.user = null;
                state.isAuth = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {setAuthChecked, setUser, logout} = authSlice.actions;

export default authSlice.reducer;