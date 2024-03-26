import {configureStore} from '@reduxjs/toolkit';

import {
    authSlice,
    currentIngredientSlice,
    orderSlice,
    ingredientsSlice,
    constructorSlice,
} from "slices/index.ts"


const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        constructorSlice: constructorSlice,
        currentIngredientSlice: currentIngredientSlice,
        orderSlice: orderSlice,
        authSlice: authSlice,
    }
});
export default store;