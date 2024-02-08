// ingredientsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_DATA_URL } from 'utils/routs';
import { checkResponse } from 'utils/check-response';

// Создайте асинхронное действие (async thunk) для запроса ингредиентов
export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
	const response = await fetch(INGREDIENTS_DATA_URL);
	const data = await checkResponse(response);
	return data.data;
});

// Создайте slice
const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: {
		list: [],
		status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.list = action.payload;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default ingredientsSlice.reducer;

// Экспортируйте действие для использования в компонентах
// export { fetchIngredients };