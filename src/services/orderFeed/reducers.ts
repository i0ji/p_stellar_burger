import {createReducer} from "@reduxjs/toolkit";
import {TError, TOrdersFeed, TOrderFeedStore} from "declarations/types"
import {
    wsMessage,
    wsClose,
    wsConnect,
    wsConnecting,
    wsDisconnect,
    wsError,
    wsOpen,
} from "services/orderFeed/actions.ts";

enum WebsocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

const initialState: TOrderFeedStore & TError = {
    status: WebsocketStatus.OFFLINE,
    error: '',
    orders: {
        total: null,
        totalToday: null,
        orders: [
            {
                ingredients: [],
                _id: '',
                status: 'idle',
                number: null,
                createdAt: '',
                updatedAt: '',
            }
        ]
    }
}

export const orderFeedReducer = createReducer(
    initialState,
    builder => {
        builder
            .addCase(wsConnect, (state) => {
                state.status = WebsocketStatus.OFFLINE;
            })
            .addCase(wsConnecting, (state) => {
                state.status = WebsocketStatus.CONNECTING;
            })
            .addCase(wsOpen, (state) => {
                state.status = WebsocketStatus.ONLINE;
                state.error = null;
            })
            .addCase(wsMessage, (state, action: { payload: TOrdersFeed, type: string }) => {
                state.status = WebsocketStatus.ONLINE;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(wsClose, (state) => {
                state.status = WebsocketStatus.OFFLINE;
            })
            .addCase(wsDisconnect, (state) => {
                state.status = WebsocketStatus.OFFLINE;
            })
            .addCase(wsError, (state, action: { payload: Error, type: string }) => {
                state.status = WebsocketStatus.OFFLINE;
                state.error = action.payload;
            })
    }
)