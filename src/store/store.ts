import {configureStore} from '@reduxjs/toolkit';
import ingredientsListSlice from 'slices/ingredientsSlice.ts';
import constructorSlice from "slices/constructorSlice.ts";

const store = configureStore({
    reducer: {
        ingredients: ingredientsListSlice,
        constructorSlice: constructorSlice
    }
});

export default store;