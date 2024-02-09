import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {INGREDIENTS_DATA_URL} from 'utils/routs';
import {checkResponse} from 'utils/check-response';

export const fetchIngredients = createAsyncThunk('burger/fetchIngredients', async () => {
	const response = await fetch(INGREDIENTS_DATA_URL);
	const data = await checkResponse(response);
	return data.data;
});

const ingredientsListSlice = createSlice({
	name: 'burger',
	initialState: {
		ingredients: [],
		status: 'idle',
		error: null
	},
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

export const {setIngredientsError, setIngredientsLoading} = ingredientsListSlice.actions;

export default ingredientsListSlice.reducer;