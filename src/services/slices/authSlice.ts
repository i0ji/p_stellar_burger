import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser, logoutUser, getUserData, updateUserData} from "utils/api.ts";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
        isAuth: false,
        authChecked: false,
        userData: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuth = !!action.payload;
        },
        setAuthChecked(state, action) {
            state.authChecked = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
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
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                state.isAuth = false;
                state.userData = null;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.isAuth = false;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {setAuthChecked, setUser} = authSlice.actions;

export default authSlice.reducer;
