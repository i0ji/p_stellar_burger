import { createSlice } from '@reduxjs/toolkit';

const authSlice  = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;

