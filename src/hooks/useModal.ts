import {useCallback, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {updateOrderNumber} from "slices/orderSlice.ts";

export default function useModal(requestFunction) {
    const dispatch = useDispatch();

    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);

    const openModal = useCallback(async () => {
        try {
            const responseData = await requestFunction();
            if (responseData.success) {
                console.log('it`s ok for now')
                console.log(responseData.order.number);
                dispatch(updateOrderNumber(responseData.order.number))
                toggleVisibility();
            } else {
                console.error('YOU WILL NOT GET FOOD:', responseData);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }, [requestFunction]);

    const closeModal = useCallback(() => {
        toggleVisibility();
    }, []);

    return {isVisible, openModal, closeModal};
}

