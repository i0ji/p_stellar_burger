import {IToken, IUser, IUserData} from "declarations/sliceInterfaces";
import {IIngredient} from "declarations/interfaces";

export type TInputElementType = HTMLInputElement | null;

export type TServerResponse<T> = {
    success: boolean;
} & T;

export type TApiResponse<T> = TServerResponse<{
    [key: string]: T;
}>;

export type TIngredientResponse = TServerResponse<{
    data: IIngredient[]
}>;

type TUserLoginResponse = TServerResponse<IToken, {
    user: IUserData;
}>;

type TUserRegister = TServerResponse<IToken, IUser>

export type AppDispatch = typeof store.dispatch;