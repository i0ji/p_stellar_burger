import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from 'utils/routs.ts';
import {checkResponse} from 'utils/check-response.ts';

export const createOrder = createAsyncThunk('orderSlice/createOrder', async (ingredientIds: string[]) => {
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
	
	const data = await response.json();
	return data.data.number;
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
		addOrderId: (state, action) => {
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
				state.error = action.error.message !== undefined ? action.error.message : null;
			})
	},
});
export const {updateIds, addOrderId} = orderSlice.actions;
export default orderSlice.reducer;