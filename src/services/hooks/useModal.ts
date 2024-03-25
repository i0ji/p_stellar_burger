import {useCallback, useReducer} from 'react';
import {useDispatch} from "hooks/reduxHooks.ts";
import {resetIngredients} from "slices/constructorSlice.ts";

export default function useModal() {

    const dispatch = useDispatch();
    const [isVisible, toggleVisibility] = useReducer((isVisible) => !isVisible, false);

    //--------------- OPEN MODAL AND CREATE ORDER
    const openModal = useCallback(async () => {
        toggleVisibility();
    }, []);

    const closeModal = useCallback(() => {
        dispatch(resetIngredients());
        toggleVisibility();
    }, [dispatch]);

    return {isVisible, openModal, closeModal};
}