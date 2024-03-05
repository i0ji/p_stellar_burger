import {ICurrentIngredientSlice, IIngredientsListSlice, IConstructorSlice, IAuthSlice, IOrderSlice} from "interfaces/sliceInterfaces";

export interface RootState {
    ingredients: IIngredientsListSlice;
    constructorSlice: IConstructorSlice;
    authSlice: IAuthSlice;
    currentIngredientSlice: ICurrentIngredientSlice;
    orderSlice: IOrderSlice;
}