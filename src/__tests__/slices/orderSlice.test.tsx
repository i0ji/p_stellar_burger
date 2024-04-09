// import orderReducer, { updateIds, updateOrderNumber, updateCurrentOrder } from 'slices/orderSlice';
// import { createOrder } from 'utils/api.ts';
// import {IOrderSlice} from "declarations/sliceInterfaces";
//
// describe('orderReducer', () => {
//     const initialState: IOrderSlice = {
//         orderNumber: null,
//         IDs: [''],
//         status: 'idle',
//         error: null,
//         currentOrder: {
//             createdAt: '',
//             ingredients: [''],
//             name: '',
//             number: null,
//             status: 'pending',
//             _id: '',
//             updatedAt: '',
//         },
//     };
//
//     it('should handle updateIds', () => {
//         const newState = orderReducer(initialState, updateIds(['id1', 'id2']));
//         expect(newState.IDs).toEqual(['id1', 'id2']);
//     });
//
//     it('should handle updateOrderNumber', () => {
//         const newState = orderReducer(initialState, updateOrderNumber(123));
//         expect(newState.orderNumber).toEqual(123);
//         expect(newState.error).toBeNull();
//     });
//
//     it('should handle updateCurrentOrder', () => {
//         const newOrder = {
//             createdAt: '2024-04-09',
//             ingredients: ['ingredient1', 'ingredient2'],
//             name: 'Order Name',
//             number: 456,
//             status: 'pending',
//             _id: 'abc123',
//             updatedAt: '2024-04-09',
//         };
//         const newState = orderReducer(initialState, updateCurrentOrder(newOrder));
//         expect(newState.currentOrder).toEqual(newOrder);
//         expect(newState.error).toBeNull();
//     });
//
//     it('should handle createOrder.pending', () => {
//         const newState = orderReducer(initialState, createOrder.pending);
//         expect(newState.status).toEqual('loading');
//     });
//
//     it('should handle createOrder.fulfilled', () => {
//         const newState = orderReducer(initialState, createOrder.fulfilled(789));
//         expect(newState.status).toEqual('succeeded');
//         expect(newState.orderNumber).toEqual(789);
//         expect(newState.error).toBeNull();
//     });
//
//     it('should handle createOrder.rejected', () => {
//         const newState = orderReducer(initialState, createOrder.rejected({ message: 'Error message' }));
//         expect(newState.status).toEqual('failed');
//         expect(newState.error).toEqual('Error message');
//     });
// });