import {createSlice} from '@reduxjs/toolkit';

const setUserSlice = createSlice({
    name: 'setUserSlice',
    initialState: {
        user: {},
        isAuthChecked:false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
    },
});

export const {setUser, setAuthChecked} = setUserSlice.actions;
export default setUserSlice.reducer;