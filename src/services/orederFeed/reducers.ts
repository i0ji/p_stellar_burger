import {createReducer} from "@reduxjs/toolkit";
import {TOrdersFeed} from "declarations/types";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "services/orederFeed/actions.ts";

const initialState: TOrdersFeed = {
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

export const orderFeedReducer = createReducer(initialState, builder => {
        builder
            .addCase(wsConnecting, (state) => {
                state.success = false;
            })
            .addCase(wsOpen, (state) => {
                state.success = true;
            })
            .addCase(wsError, (state) => {
                state.success = false;
            })
            .addCase(wsClose, (state) => {
                state.success = true;
            })
            .addCase(wsMessage, (state, action) => {
                state.success = true;
                state.orders = action.payload.orders;
                state.totalToday = action.payload.totalToday;
                state.total = action.payload.total
            })
    }
)