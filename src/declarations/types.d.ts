import {IToken, IUserData} from "declarations/sliceInterfaces";
import {IIngredient} from "declarations/interfaces";

export type TInputElementType = HTMLInputElement | null;

export type TServerResponse<T> = {
	success: boolean;
} & T;

export type TApiResponse<T> = TServerResponse<{
	[key: string]: T;
}>;

// export type TForgotPassword = TServerResponse<{
// 	message: string;
// }>;

export type TIngredientResponse = TServerResponse<{
	data: IIngredient[];
}>;

//export type TToken = TServerResponse<IToken>;

type TUserLoginResponse = TServerResponse<IToken, {
	user: IUserData;
}>;