import {useCallback, useReducer} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createOrder, updateOrderNumber} from "slices/orderSlice.ts";
import {resetIngredients} from "slices/constructorSlice.ts";
import {useNavigate} from "react-router-dom";

export default function useModal(IDs: string[]) {

    const dispatch = useDispatch();
    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);
	const navigate = useNavigate();

    //--------------- AUTH STATE
    const isAuth = useSelector(state => state.authSlice.isAuth);


    const openModal = useCallback(async () => {
        try {
            const orderNumber = dispatch(createOrder(IDs));
            dispatch(updateOrderNumber(orderNumber.payload));
            toggleVisibility();
        } catch (error: any) {
            console.error('При создании заказа произошла ошибка:', error.message);
        }
    }, [dispatch, IDs]);

    const closeModal = useCallback(() => {
        dispatch(resetIngredients());
        toggleVisibility();
    }, [dispatch]);



    return {isVisible, openModal, closeModal};
}