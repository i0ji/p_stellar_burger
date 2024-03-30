import {createAction} from "@reduxjs/toolkit";
import {TError, TOrdersFeed} from "declarations/types";

export const wsUserConnect = createAction<string>('ORDER_FEED_WS_USER_CONNECT');

export const wsUserConnecting = createAction('ORDER_FEED_WS_USER_CONNECTING');

export const wsUserOpen = createAction('ORDER_FEED_WS_USER_OPEN');

export const wsUserMessage = createAction<TOrdersFeed>('ORDER_FEED_WS_USER_MESSAGE');

export const wsUserClose = createAction('ORDER_FEED_WS_USER_CLOSE');

export const wsUserDisconnect = createAction('ORDER_FEED_WS_USER_DISCONNECT');

export const wsUserError = createAction<TError, 'ORDER_FEED_WS_USER_ERROR'>('ORDER_FEED_WS_USER_ERROR');