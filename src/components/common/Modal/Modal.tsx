import React, {useEffect, useState} from "react";

import styles from "./ModalStyles.module.scss"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {IIngredient, IModalOverlayProps} from "interfaces/interfaces";
import {useSelector} from "react-redux";

export default function Modal({onClose, children}: {
    onClose?: () => void,
    children: React.ReactNode,
    selectedIngredient?: null | IIngredient
}) {

    // --------------- FADE IN/OUT ANIMATION  ---------------

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);


    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (onClose) (e.key === "Escape" ? onClose() : null);
        }

        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);


    // --------------- ERROR CHECK  ---------------

    const hasError = useSelector(state => state.orderSlice.error);
    console.log(`We have a error: ${hasError}`)


    // --------------- MODAL OVERLAY  ---------------
    function ModalOverlay(props: IModalOverlayProps) {

        return (
            <div
                className={`${styles.modal_overlay}  ${mounted ? styles.fadeIn : styles.fadeOut} ${hasError && styles.modal_error}`}
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
                    {!hasError && <CloseIcon
                        type="primary"
                        onClick={onClose}/>
                    }
                </div>
                {children}
            </div>
        </>
    )
}