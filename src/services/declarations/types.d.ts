import {IToken, IUser, IUserData} from "declarations/sliceInterfaces";
import {IIngredient} from "declarations/interfaces";
import {RootState} from "declarations/rootState.ts";

import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator} from 'redux';

import Error = types.Error;
import {
    wsClose,
    wsConnect,
    wsConnecting,
    wsDisconnect,
    wsError,
    wsMessage,
    wsOpen
} from "services/orederFeed/actions.ts";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

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

export type TAppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState>
>;

//NEW WS TYPES
export type TBurgerComplete = 'done' | 'cancel' | 'await' | 'idle';

export type TwsActions = wsOpen | wsError | wsClose | wsConnecting | wsConnect | wsMessage | wsDisconnect;

export type TOrder = {
    createdAt?: string,
    ingredients?: Array<string>,
    name?: string,
    number?: number,
    status?: TBurgerComplete,
    _id?: string,
    updatedAt?: string,
    order: TOrder
}

export type TOrdersFeed = {
    success: boolean;
    total: string;
    totalToday: string;
    orders: Array<TOrder>;
};

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onMessage: ActionCreatorWithPayload<TOrdersFeed>,
    onClose: ActionCreatorWithoutPayload,
    wsDisconnect: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<TError>,
}

export type TOrderFeedActions = ReturnType<typeof wsConnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsDisconnect>
    | ReturnType<typeof wsError>
