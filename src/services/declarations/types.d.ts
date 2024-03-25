import {IToken, IUser, IUserData} from "declarations/sliceInterfaces";
import {IIngredient} from "declarations/interfaces";
import {RootState} from "declarations/rootState.ts";

import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator} from 'redux';

import Error = types.Error;

export type TInputElementType = HTMLInputElement | null;

export type TServerResponse<T> = {
    success: boolean;
} & T;

export type TStatus = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

type TError = Error | null;

export type TApiResponse<T> = TServerResponse<{
    [key: string]: T;
}>;

export type TIngredientResponse = TServerResponse<{
    data: IIngredient[]
}>;

type TUserLoginResponse = TServerResponse<IToken, {
    user: IUserData;
}>;

type TUserRegister = TServerResponse<IToken, IUser>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState>
>;


export type TOrdersFeed = TServerResponse<{
    orders: [
        {
            ingredients: Array<string>,
            _id: string,
            status: string,
            number: number,
            createdAt: string,
            updatedAt: string
        }
    ],
    total: string,
    totalToday: string
}>