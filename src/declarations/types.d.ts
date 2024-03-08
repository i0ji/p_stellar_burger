import {IUserData} from "declarations/sliceInterfaces";
import {IIngredient} from "declarations/interfaces";

export type TInputElementType = HTMLInputElement | null;

export type TServerResponse<T> = {
    success: boolean;
} & T;

export type TIngredientResponse = TServerResponse<{
    data: IIngredient[];
}>

export type TToken = TServerResponse<{
    accessToken: string,
    refreshToken: string,
}>

type TUserLoginResponse = TServerResponse<{
    accessToken: string,
    refreshToken: string,
    user: IUserData;
}>