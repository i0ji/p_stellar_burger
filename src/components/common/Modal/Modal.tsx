import React, {useEffect} from "react";

import styles from "./ModalStyles.module.scss"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {IIngredient, IModalOverlayProps} from "interfaces/interfaces";
import {useSelector} from "react-redux";

export default function Modal({onClose, children}: {
    onClose?: () => void,
    children: React.ReactNode,
    selectedIngredient?: null | IIngredient
}) {

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (onClose) (e.key === "Escape" ? onClose() : null);
        }

        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);

    function ModalOverlay(props: IModalOverlayProps) {

        const hasError = useSelector(state => state.orderSlice.error);

        return (
            <div
                className={`${styles.modal_overlay} ${hasError && styles.modal_error}`}
                onClick={props.onClose}
            >
                {props.children}
            </div>
        );
    }




    return (
        <>
            <ModalOverlay onClose={onClose}/>
            <div
                className={styles.modal}>
                <div className={styles.modal_btn}>
                    <CloseIcon
                        type="primary"
                        onClick={onClose}
                    />
                </div>
                {children}
            </div>
        </>
    )
}