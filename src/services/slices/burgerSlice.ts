// burgerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_DATA_URL } from 'utils/routs';
import { checkResponse } from 'utils/check-response';

// Асинхронное действие для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk('burger/fetchIngredients', async () => {
	const response = await fetch(INGREDIENTS_DATA_URL);
	const data = await checkResponse(response);
	return data.data;
});

// Создание slice (редьюсер и экшены)
const burgerSlice = createSlice({
	name: 'burger',
	initialState: { ingredients: [], status: 'idle', error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.ingredients = action.payload;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

// Экспорт экшенов
export const { setIngredientsError, setIngredientsLoading } = burgerSlice.actions;

// Экспорт редьюсера
export default burgerSlice.reducer;
