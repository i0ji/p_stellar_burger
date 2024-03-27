import {createReducer} from "@reduxjs/toolkit";
import {TError, TOrdersFeed, TServerResponse} from "declarations/types";
import {
    wsClose,
    wsConnect,
    wsConnecting,
    wsDisconnect,
    wsError,
    wsMessage,
    wsOpen
} from "services/orederFeed/actions.ts"

const initialOrder: TOrdersFeed = {
    success: false,
    orders: [
        {
            ingredients: [],
            _id: '',
            status: 'idle',
            number: 0,
            createdAt: '',
            updatedAt: ''
        }
    ],
    total: '',
    totalToday: '',
}

const initialState: TServerResponse<TOrdersFeed> & TError = {
    success: false,
    orders: initialOrder,
    error: null,
}

export const orderFeedReducer = createReducer(initialState, builder => {
        builder
            .addCase(wsConnect, (state) => {
                state.success = true;
            })
            .addCase(wsConnecting, (state) => {
                state.success = false;
            })
            .addCase(wsOpen, (state) => {
                state.success = true;
            })
            .addCase(wsMessage, (state, action) => {
                state.success = true;
                state.orders.orders = action.payload;
            })
            .addCase(wsClose, (state) => {
                state.success = false;
            })
            .addCase(wsDisconnect, (state) => {
                state.success = false;
            })
            .addCase(wsError, (state, action) => {
                state.success = false;
                state.error = action.payload;
            })
    }
)