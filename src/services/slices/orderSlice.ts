import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from 'utils/routs.ts';
import {checkResponse} from 'utils/check-response.ts';

export const createOrder = createAsyncThunk('dataSlice/fetchDataByIds', async (IDs) => {
    const requestBody = {ids: IDs};
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    const data = await checkResponse(response);
    return data.data;
});


export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        orderNumber: null,
        IDs: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        updateIds: (state, action) => {
            state.IDs = action.payload;
        },
        updateOrderNumber: (state, action) => {
            state.orderNumber = action.payload;
        },
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
                state.error = action.error.message !== undefined ? action.error.message : null;
            });
    },
});
export const {updateIds, updateOrderNumber} = orderSlice.actions;
export default orderSlice.reducer;