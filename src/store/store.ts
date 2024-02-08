import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from 'services/slices/burgerSlice';

const store = configureStore({
	reducer: {
		burger: burgerReducer,
	},
});

export default store;