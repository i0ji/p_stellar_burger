
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
import {TOrder} from "declarations/types";

const testOrder: TOrder = {
    createdAt: '01.01.24',
    ingredients: ['123abc123abc', '456def456def'],
    name: 'Spicy sauce',
    number: 400,
    status: 'done',
    _id: '789ghi789ghi',
    updatedAt: '01.02.24',
}

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
            orders: [testOrder, testOrder]
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