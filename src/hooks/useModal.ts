import {useCallback, useReducer} from 'react';
import {useDispatch} from "react-redux";
import {updateOrderNumber} from "slices/orderSlice.ts";
import {resetIngredients} from "slices/constructorSlice.ts";
import {createOrder} from "utils/api.ts";


export default function useModal(IDs: (string | undefined)[]) {

    const dispatch = useDispatch();
    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);

    //--------------- OPEN MODAL AND CREATE ORDER
    const openModal = useCallback(async () => {
        try {
            const orderNumber = dispatch(createOrder(IDs as string[]));
            dispatch(updateOrderNumber(orderNumber.payload));
            toggleVisibility();
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('При создании заказа произошла ошибка:', errorMessage);
        }
    }, [dispatch, IDs]);

    const closeModal = useCallback(() => {
        dispatch(resetIngredients());
        toggleVisibility();
    }, [dispatch]);

    return {isVisible, openModal, closeModal};
}