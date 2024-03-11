import {IIngredient} from "utils/interfaces/interfaces";
import Error = types.Error;

interface IIngredients {
    ingredients: Array<IIngredient>;
}

export interface IIngredientsListSlice extends IIngredients {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface ICurrentIngredientSlice {
    selectedIngredient: IIngredient;
}

export interface IBurgerState extends IIngredients {
    status: string;
    error: string | null;
}

interface IConstructorSlice {
    ingredients: Array<IIngredient>;
    totalAmount: number;
    addedIngredients: Array<IIngredient>;
    bun: IIngredient | null;
}

export interface IAuthSlice {
    status: string;
    user: IUserData,
    userData: IUserData,
    isAuth: boolean;
    success?: boolean,
    refreshToken?: string,
    accessToken: string,
    authChecked: boolean,
    error: Error,
    loginError: boolean;
}

export interface IOrderSlice {
    orderNumber: string | number | null,
    IDs: Array<string>,
    status: string,
    error: null,
}

export interface IRefreshData {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}

export interface IUserData {
    email?: string;
    name?: string;
    password?: string;
    user?:
        {
            email: string;
            password: string;
        }
}

export interface IRegisterUser {
    success: boolean;
    user:
        {
            email: string;
            password: string;
        };
    refreshToken: string;
    accessToken: string;
}