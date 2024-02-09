import {configureStore} from '@reduxjs/toolkit';
import ingredientsListSlice from 'slices/ingredientsSlice.ts';

const store = configureStore({
    reducer: {
        ingredients: ingredientsListSlice,
    },
});

export default store;