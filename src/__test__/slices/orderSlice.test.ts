import { createOrder } from "utils/api.ts";
import orderReducer, { initialState, updateIds, updateOrderNumber, updateCurrentOrder } from 'slices/orderSlice';

jest.mock('utils/api.ts');

describe('orderSlice test', () => {
    it('should handle updateIds', () => {
        const action = { type: updateIds.type, payload: ['id1', 'id2'] };
        const state = orderReducer(initialState, action);
        expect(state.IDs).toEqual(['id1', 'id2']);
    });

    it('should handle updateOrderNumber', () => {
        const action = { type: updateOrderNumber.type, payload: 123 };
        const state = orderReducer(initialState, action);
        expect(state.orderNumber).toEqual(123);
        expect(state.error).toBeNull();
    });

    it('should handle updateCurrentOrder', () => {
        const orderData = {
            createdAt: '2024-04-10',
            ingredients: ['ingredient1', 'ingredient2'],
            name: 'Order 1',
            number: 1,
            status: 'pending',
            _id: '123456',
            updatedAt: '2024-04-10',
        };
        const action = { type: updateCurrentOrder.type, payload: orderData };
        const state = orderReducer(initialState, action);
        expect(state.currentOrder).toEqual(orderData);
        expect(state.error).toBeNull();
    });

    it('should handle createOrder.pending', () => {
        const state = orderReducer(initialState, { type: createOrder.pending.type });
        expect(state.status).toEqual('loading');
    });

    it('should handle createOrder.fulfilled', () => {
        const action = { type: createOrder.fulfilled.type, payload: 123 };
        const state = orderReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.orderNumber).toEqual(123);
        expect(state.error).toBeNull();
    });

    it('should handle createOrder.rejected', () => {
        const action = { type: createOrder.rejected.type, error: { message: 'Error message' } };
        const state = orderReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });
});