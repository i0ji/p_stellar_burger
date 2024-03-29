import {IIngredient} from "utils/interfaces/interfaces";
import {TStatus, TError} from "declarations/types";
import {IIngredients} from "declarations/interfaces";

export interface IConstructorSlice {
    ingredients: Array<IIngredient>;
    totalAmount: number;
    addedIngredients: Array<IIngredient>;
    bun: IIngredient | null;
}

export interface IIngredientsListSlice extends IIngredients, TStatus, TError {
}

export interface IAuthSlice extends TStatus, TError {
    user: IUserData | null,
    userData: IUserData | null;
    isAuth: boolean;
    authChecked: boolean;
    loginError: boolean;
}