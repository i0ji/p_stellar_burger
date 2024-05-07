import {useCallback, useReducer} from "react";
import {useDispatch} from "hooks/reduxHooks.ts";
import {resetIngredients} from "slices/constructorSlice.ts";

export default function useModal() {
    const dispatch = useDispatch(),
        [isVisible, toggleVisibility] = useReducer(isVisible => !isVisible, false),
        //--------------- OPEN MODAL AND CREATE ORDER
        openModal = useCallback(async () => {
            toggleVisibility();
        }, []),
        closeModal = useCallback(() => {
            dispatch(resetIngredients());
            toggleVisibility();
        }, [dispatch]);

    return {isVisible, openModal, closeModal};
}
