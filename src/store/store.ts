import { configureStore } from '@reduxjs/toolkit';
import ingredientsListSlice from 'services/slices/ingredientsListSlice.ts';

const store = configureStore({
	reducer: {
		ingredients: ingredientsListSlice,
	},
});

export default store;