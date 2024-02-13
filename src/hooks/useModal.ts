import {useCallback, useReducer} from 'react';
import {useDispatch} from "react-redux";
import {createOrder, updateIds, updateOrderNumber} from "slices/orderSlice.ts";

export default function useModal(IDs: string[]) {
    const dispatch = useDispatch();
    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);

    const openModal = useCallback(async () => {
        try {
            const actionResult = await dispatch(createOrder(IDs));
            const orderNumber = actionResult;
            console.log(IDs);
            console.log('Order Number:', orderNumber.payload);

            dispatch(updateOrderNumber(orderNumber.payload))
            toggleVisibility();
        } catch (error) {
            console.error('Error creating order:', error.message);
        }
    }, [dispatch, IDs]);

    const closeModal = useCallback(() => {
        toggleVisibility();
    }, []);

    return {isVisible, openModal, closeModal};
}