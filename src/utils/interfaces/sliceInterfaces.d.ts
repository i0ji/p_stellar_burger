import {IIngredient} from "utils/interfaces/interfaces";

export interface IIngredientsListSlice {
    ingredients: IIngredient[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface ICurrentIngredientSlice {
    selectedIngredient: IIngredient;
}

export interface IBurgerState {
    ingredients: IIngredient[];
    status: string;
    error: string | null;
}

interface IConstructorSlice {
    totalAmount: number;
    ingredients: IIngredient[];
    addedIngredients: IIngredient[];
    bun: IIngredient | null;
}

export interface IUserData {
    email?: string;
    password?: string;
    name?: string;
}

export interface IAuthSlice {
    user: IUserData,
    isAuth: boolean;
    success?: boolean,
    refreshToken?: string,
    authChecked: boolean,
}

export interface IOrderSlice {
    orderNumber: string | number | null,
    IDs: string[],
    status: string,
    error: null,
}