import {IToken, IUserData} from "declarations/sliceInterfaces";
import {IIngredient} from "declarations/interfaces";

export type TInputElementType = HTMLInputElement | null;

export type TServerResponse<T> = {
    success: boolean;
} & T;

export type TIngredientResponse = TServerResponse<{
    data: IIngredient[];
}>

type TUserLoginResponse = TServerResponse<IToken, {
    user: IUserData;
}>