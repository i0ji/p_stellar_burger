

// import store from "store/store.ts";
//
// export type RootState = ReturnType<typeof store.getState>;

import {
    ICurrentIngredientSlice,
    IIngredientsListSlice,
    IConstructorSlice,
    IAuthSlice,
    IOrderSlice
} from "declarations/sliceInterfaces";

export type RootState = {
    ingredients: IIngredientsListSlice;
    constructorSlice: IConstructorSlice;
    authSlice: IAuthSlice;
    currentIngredientSlice: ICurrentIngredientSlice;
    orderSlice: IOrderSlice;
}