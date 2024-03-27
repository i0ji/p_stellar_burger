import {createAction} from "@reduxjs/toolkit";
import {TError, TOrdersFeed} from "declarations/types";

export const wsConnect = createAction('ORDER_FEED_WS_CONNECT');

export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING');

export const wsOpen = createAction('ORDER_FEED_WS_OPEN');

export const wsMessage = createAction<TOrdersFeed>('ORDER_FEED_WS_MESSAGE');

export const wsClose = createAction('ORDER_FEED_WS_CLOSE');

export const wsDisconnect = createAction('ORDER_FEED_WS_DISCONNECT');

export const wsError = createAction<TError>('ORDER_FEED_WS_ERROR');

export const wsActions = {
    wsConnect,
    wsConnecting,
    wsOpen,
    wsMessage,
    wsClose,
    wsDisconnect,
    wsError,
}