import {IIngredient} from "declarations/interfaces";

export type TServerResponse<T> = {
    success: boolean;
} & T;

export type TIngredientResponse = TServerResponse<{
    data: IIngredient[];
}>

export type TRefreshToken = TServerResponse<{
    accessToken: string,
    refreshToken: string,
    success: boolean,
}>

type TUserLoginResponse = TServerResponse<{
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        names: string
    }
}>