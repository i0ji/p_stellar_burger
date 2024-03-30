import {createReducer} from "@reduxjs/toolkit";
import {TError, TOrdersFeed, TOrderFeedStore} from "declarations/types"
import {
    wsUserMessage,
    wsUserClose,
    wsUserConnect,
    wsUserConnecting,
    wsUserDisconnect,
    wsUserError,
    wsUserOpen,
} from "services/userOrderFeed/actions.ts";

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

export const userOrderFeedReducer = createReducer(
    initialState,
    builder => {
        builder
            .addCase(wsUserConnect, (state) => {
                state.state.status = WebsocketStatus.OFFLINE;
            })
            .addCase(wsUserConnecting, (state) => {
                state.status = WebsocketStatus.CONNECTING;
            })
            .addCase(wsUserOpen, (state) => {
                state.status = WebsocketStatus.ONLINE;
                state.error = null;
            })
            .addCase(wsUserMessage, (state, action: { payload: TOrdersFeed, type: string }) => {
                state.status = WebsocketStatus.ONLINE;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(wsUserClose, (state) => {
                state.status = WebsocketStatus.OFFLINE;
            })
            .addCase(wsUserDisconnect, (state) => {
                state.status = WebsocketStatus.OFFLINE;
            })
            .addCase(wsUserError, (state, action: { payload: Error, type: string }) => {
                state.status = WebsocketStatus.OFFLINE;
                state.error = action.payload;
            })
    }
)