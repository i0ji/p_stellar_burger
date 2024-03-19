import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser, logoutUser, getUserData, updateUserData} from "utils/api.ts";
import {IAuthSlice, IUserData} from "declarations/sliceInterfaces";


const initialState: IAuthSlice = {
    user: null,
    status: 'idle',
    userData: null as null | IUserData,
    error: null as null | undefined | string,
    isAuth: false,
    authChecked: false,
    loginError: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
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
                state.loginError = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.loginError = true;
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
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                state.status = 'idle';
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
