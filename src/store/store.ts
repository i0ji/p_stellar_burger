import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/slices/ingredinetsSlice.ts';

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
	},
});

export default store;