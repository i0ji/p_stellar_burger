import {createSlice} from '@reduxjs/toolkit';
import {createOrder} from "utils/api.ts";


export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        orderNumber: null,
        IDs: [],
        status: 'idle' || 'loading' || 'succeeded' || 'failed',
        error: null,
    },
    reducers: {
        updateIds: (state, action) => {
            state.IDs = action.payload;
        },
        updateOrderNumber: (state, action) => {
            state.orderNumber = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderNumber = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message !== undefined ? action.error.message : '';
            })
    },
});
export const {updateIds, updateOrderNumber} = orderSlice.actions;
export default orderSlice.reducer;