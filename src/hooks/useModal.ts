import {useCallback, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createOrder} from "slices/orderSlice.ts";

export default function useModal(idsArray) {
    const dispatch = useDispatch();

    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);

    const openModal = useCallback(async () => {
        try {
            const responseData = await createOrder();
            if (responseData) {
                console.log(responseData);
                toggleVisibility();
            } else {
                console.error('YOU WILL NOT GET FOOD:', responseData);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }, []);


    // const openModal = useCallback(() => {
    //     toggleVisibility();
    // }, []);

    const closeModal = useCallback(() => {
        toggleVisibility();
    }, []);

    return {isVisible, openModal, closeModal};
}

