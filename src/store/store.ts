import {configureStore} from '@reduxjs/toolkit';
import ingredientsListSlice from 'slices/ingredientsSlice.ts';
import constructorSlice from "slices/constructorSlice.ts";
import currentIngredientSlice from "slices/currentIngredientSlice.ts";
import orderSlice from "slices/orderSlice.ts";

const store = configureStore({
    reducer: {
        ingredients: ingredientsListSlice,
        constructorSlice: constructorSlice,
        currentIngredientSlice: currentIngredientSlice,
        orderSlice: orderSlice
    }
});

export default store;