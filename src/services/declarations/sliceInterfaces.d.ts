import {IIngredient} from "utils/interfaces/interfaces";
import {TStatus, TError} from "declarations/types";

interface IIngredients {
    ingredients: Array<IIngredient>;
}

export interface IToken {
    refreshToken: string;
    accessToken: string;
}

export interface IRefreshData extends IToken {
    success: boolean;
}

export interface IConstructorSlice {
    ingredients: Array<IIngredient>;
    totalAmount: number;
    addedIngredients: Array<IIngredient>;
    bun: IIngredient | null;
}

export interface IIngredientsListSlice extends IIngredients, TStatus, TError {}

export interface IBurgerState extends IIngredients, TStatus, TError {
}

export interface IAuthSlice extends TStatus, TError {
    user: IUserData | null,
    userData: IUserData | null;
    isAuth: boolean;
    authChecked: boolean;
    loginError: boolean;
}

export interface IUser {
    name?: string | null,
    email?: string | undefined;
    password?: string | undefined;
}

export interface IUserData extends IUser {
    user?: IUser;
}

export interface IRegisterUser extends IRefreshData {
    user: IUser;
}

export interface IOrderSlice extends TStatus {
    order: number;
    orderNumber: string | number | null;
    IDs: Array<string>;
    error: null;
}

export interface ICurrentIngredientSlice {
    selectedIngredient: IIngredient;
}