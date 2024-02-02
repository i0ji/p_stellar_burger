// import {useCallback, useReducer, useState} from "react";
//
//
// export const useModal = () => {
//
//     const [isVisible, toggleVisibility] = useReducer(isVisible => !isVisible, false);
//
//     const handleOpenModal = useCallback(() => {
//         toggleVisibility();
//     }, []);
//
//     const handleCloseModal = useCallback(() => {
//         toggleVisibility();
//     }, []);
//
//     return {
//         isVisible,
//         handleOpenModal,
//         handleCloseModal,
//     };
// };