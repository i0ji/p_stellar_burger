import {IIngredient} from "utils/interfaces/interfaces";
import Error = types.Error;

interface IIngredients {
	ingredients: Array<IIngredient>;
}

export interface IToken {
	refreshToken: string;
	accessToken: string;
}

export interface IConstructorSlice {
	ingredients: Array<IIngredient>;
	totalAmount: number;
	addedIngredients: Array<IIngredient>;
	bun: IIngredient | null;
}

export interface IIngredientsListSlice extends IIngredients {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: Error | null;
}

export interface ICurrentIngredientSlice {
	selectedIngredient: IIngredient;
}

export interface IBurgerState extends IIngredients {
	status: string;
	error: string | null;
}

export interface IAuthSlice extends IToken{
	status: string;
	user: IUserData,
	userData: IUserData,
	isAuth: boolean;
	success?: boolean;
	authChecked: boolean;
	error: Error | null;
	loginError: boolean;
}



export interface IRefreshData extends IToken {
	success: boolean;
}

export interface IUser {
	name?: string | null,
	email: string | undefined;
	password: string | undefined;
}

export interface IUserData {
	email?: string;
	name?: string;
	password?: string;
	user?: IUser;
}

export interface IRegisterUser extends IRefreshData {
	user: IUser;
}

export interface IOrderSlice {
	order: number;
	orderNumber: string | number | null;
	IDs: Array<string>;
	status: string;
	error: null;
}