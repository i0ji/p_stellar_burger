import {useState, useCallback, useReducer} from 'react';
import {IRequestFunction} from "utils/interfaces/interfaces";

export default function useModal(serverRequestFunction: IRequestFunction) {
    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);
    const [orderNumber, setOrderNumber] = useState('');

    const openModal = useCallback(async () => {
        try {
            const responseData = await serverRequestFunction();
            if (responseData.success) {
                console.log(responseData.order.number);
                setOrderNumber(responseData.order.number);
                toggleVisibility();
            } else {
                console.error('YOU WILL NOT GET FOOD:', responseData);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }, [serverRequestFunction]);

    const closeModal = useCallback(() => {
        toggleVisibility();
    }, []);

    return {isVisible, orderNumber, openModal, closeModal};
}