import {orderFeedReducer, initialState} from "../../services/orderFeed/reducers.ts";

import {
    wsConnect,
    wsConnecting,
    wsOpen,
    wsMessage,
    wsClose,
    wsDisconnect,
    wsError,
    onOpen,
    onError,
    onClose
} from 'services/orderFeed/actions.ts';
import {createAction} from "@reduxjs/toolkit";

describe('orderFeedReducer/Actions test', () => {
    const invalidAction = createAction<string, 'INVALID_ACTION'>('INVALID_ACTION');
    const someAction = invalidAction('INVALID_ACTION');

    // --------------- WS CONNECT
    it('should wsConnect', () => {
        const state = orderFeedReducer(initialState, wsConnect('TEST_URL'));
        expect(state.status).toEqual('CONNECTING');
    });
    // --------------- WS CONNECTING
    it('should wsConnecting', () => {
        const state = orderFeedReducer(initialState, wsConnecting());
        expect(state.status).toEqual('CONNECTING');
    });
    // --------------- WS OPEN
    it('should wsOpen', () => {
        const state = orderFeedReducer(initialState, wsOpen());
        expect(state.status).toEqual('ONLINE');
        expect(state.error).toBeNull();
    });
    // --------------- WS MESSAGE
    it('should wsMessage', () => {
        const payload = {
            success: true,
            total: '10',
            totalToday: '5',
            orders: [initialState.orders, initialState.orders]
        };
        const state = orderFeedReducer(initialState, wsMessage(payload));
        expect(state.status).toEqual('ONLINE');
        expect(state.orders).toEqual(payload);
        expect(state.error).toBeNull();
    });
    // --------------- WS CLOSE
    it('should wsClose', () => {
        const state = orderFeedReducer(initialState, wsClose());
        expect(state.status).toEqual('OFFLINE');
    });
    // --------------- WS DISCONNECT
    it('should wsDisconnect', () => {
        const state = orderFeedReducer(initialState, wsDisconnect());
        expect(state.status).toEqual('OFFLINE');
    });
    // --------------- WS ERROR
    it('should wsError', () => {
        const error = new Error('Test error');
        const state = orderFeedReducer(initialState, wsError(error));
        expect(state.status).toEqual('OFFLINE');
        expect(state.error).toEqual(error);
    });
    // --------------- ON CLOSE
    it('should onOpen', () => {
        const state = orderFeedReducer(initialState, onOpen());
        expect(state.status).toEqual('ONLINE');
        expect(state.error).toBeNull();
    });
    // --------------- ON CLOSE
    it('should onError', () => {
        const error = new Error('Test error');
        const state = orderFeedReducer(initialState, onError(error));
        expect(state.status).toEqual('OFFLINE');
        expect(state.error).toEqual(error);
    });
    // --------------- ON CLOSE
    it('should onClose', () => {
        const state = orderFeedReducer(initialState, onClose());
        expect(state.status).toEqual('OFFLINE');
    });
    // --------------- INVALID ACTION TYPE
    it('should return initial state status due to an invalid action', () => {
        const state = orderFeedReducer(initialState, someAction);
        expect(state.status).toEqual(initialState.status);
    });
});