import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from 'utils/routs.ts';
import {checkResponse} from 'utils/check-response.ts';

export const createOrder = createAsyncThunk('orders/createOrder', async (ingredientIds: string[]) => {
	const requestBody = {
		ingredients: ingredientIds
	};
	
	const response = await fetch(`${BASE_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});
	
	return await checkResponse(response);
});

export const orderSlice = createSlice({
	name: 'orderSlice',
	initialState: {
		orderNumber: null,
		status: 'idle',
		error: null,
	},
	reducers: {},
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

export default orderSlice.reducer;

