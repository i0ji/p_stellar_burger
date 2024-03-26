import {createAction} from "@reduxjs/toolkit";
import {TOrdersFeed} from "declarations/types";

export const connect = createAction<string, 'ORDER_FEED_CONNECT'>('ORDER_FEED_CONNECT');

export const disconnect = createAction('ORDER_FEED_DISCONNECT');

export const wsConnecting = createAction('ORDER_TABLE_WS_CONNECTING');
export const wsClose = createAction('ORDER_TABLE_WS_CLOSE');
export const wsMessage = createAction<TOrdersFeed>('ORDER_TABLE_WS_MESSAGE');
export const wsError = createAction('ORDER_TABLE_WS_ERROR');

export const wsOpen = createAction('ORDER_TABLE_WS_OPEN');