import {createOrder} from "utils/api.ts";
import orderReducer, {
    initialState,
    updateIds,
    updateOrderNumber,
    updateCurrentOrder
} from 'slices/orderSlice';

jest.mock('utils/api.ts');

describe('orderSlice test', () => {
    it('should update IDs', () => {
        const action = {
            type: updateIds.type,
            payload: ['123abc123abc', '456def456def']
        };
        const state = orderReducer(initialState, action);
        expect(state.IDs).toEqual(['123abc123abc', '456def456def']);
    });

    it('should update order number', () => {
        const action = {
            type: updateOrderNumber.type,
            payload: 123
        };
        const state = orderReducer(initialState, action);
        expect(state.orderNumber).toEqual(123);
        expect(state.error).toBeNull();
    });

    it('should update current order', () => {
        const orderData = {
            createdAt: '2024-04-10',
            ingredients: ['123abc123abc', '456def456def'],
            name: 'Order 1',
            number: 1,
            status: 'pending',
            _id: '123456',
            updatedAt: '2024-04-10',
        };
        const action = {
            type: updateCurrentOrder.type,
            payload: orderData
        };
        const state = orderReducer(initialState, action);
        expect(state.currentOrder).toEqual(orderData);
        expect(state.error).toBeNull();
    });

    it('should create order: pending', () => {
        const state = orderReducer(initialState, {type: createOrder.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should create order: fulfilled', () => {
        const action = {
            type: createOrder.fulfilled.type,
            payload: 123
        };
        const state = orderReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.orderNumber).toEqual(123);
        expect(state.error).toBeNull();
    });

    it('should create order: rejected', () => {
        const action = {
            type: createOrder.rejected.type,
            error: {message: 'Error message'}
        };
        const state = orderReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });
});