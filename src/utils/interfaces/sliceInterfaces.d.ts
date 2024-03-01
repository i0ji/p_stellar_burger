import {IIngredient} from "utils/interfaces/interfaces";

export interface IIngredientsListSlice {
    ingredients: IIngredient[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface IBurgerState {
    ingredients: IIngredient[];
    status: string;
    error: string | null;
}

interface ConstructorState {
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


export interface IAuthSlice extends IUserData {
    email: string,
    password: string,
    success?: boolean,
    refreshToken?: string,
}

