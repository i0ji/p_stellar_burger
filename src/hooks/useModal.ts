import {useCallback, useReducer} from 'react';
import {useDispatch} from "react-redux";
import {createOrder, updateOrderNumber} from "slices/orderSlice.ts";
import {resetIngredients} from "slices/constructorSlice.ts";

export default function useModal(IDs: string[]) {
	const dispatch = useDispatch();
	const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);
	
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