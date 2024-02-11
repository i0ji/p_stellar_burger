import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orderState',
    initialState: {
        setOrder: null,
    },
    reducers: {
        setOrder: (state, action) => {
            state.setOrder = action.payload;
        }
    }
});

export const {setOrder} = orderSlice.actions;
export default orderSlice.reducer;