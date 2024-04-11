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

describe('orderFeedReducer/Actions test', () => {
    it('should wsConnect', () => {
        const state = orderFeedReducer(initialState, wsConnect('TEST_URL'));
        expect(state.status).toEqual('CONNECTING');
    });

    it('should wsConnecting', () => {
        const state = orderFeedReducer(initialState, wsConnecting());
        expect(state.status).toEqual('CONNECTING');
    });

    it('should wsOpen', () => {
        const state = orderFeedReducer(initialState, wsOpen());
        expect(state.status).toEqual('ONLINE');
        expect(state.error).toBeNull();
    });

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

    it('should wsClose', () => {
        const state = orderFeedReducer(initialState, wsClose());
        expect(state.status).toEqual('OFFLINE');
    });

    it('should wsDisconnect', () => {
        const state = orderFeedReducer(initialState, wsDisconnect());
        expect(state.status).toEqual('OFFLINE');
    });

    it('should wsError', () => {
        const error = new Error('Test error');
        const state = orderFeedReducer(initialState, wsError(error));
        expect(state.status).toEqual('OFFLINE');
        expect(state.error).toEqual(error);
    });

    it('should onOpen', () => {
        const state = orderFeedReducer(initialState, onOpen());
        expect(state.status).toEqual('ONLINE');
        expect(state.error).toBeNull();
    });

    it('should onError', () => {
        const error = new Error('Test error');
        const state = orderFeedReducer(initialState, onError(error));
        expect(state.status).toEqual('OFFLINE');
        expect(state.error).toEqual(error);
    });

    it('should onClose', () => {
        const state = orderFeedReducer(initialState, onClose());
        expect(state.status).toEqual('OFFLINE');
    });
});