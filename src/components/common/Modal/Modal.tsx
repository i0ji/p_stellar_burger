import styles from "./ModalStyles.module.scss"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import Fade from "components/common/Fade/Fade.tsx";

import {IIngredient, IModalOverlayProps} from "interfaces/interfaces";

import React, {useEffect} from "react";
import {useSelector} from "react-redux";


export default function Modal({onClose, children}: {
    onClose?: () => void,
    children: React.ReactNode,
    selectedIngredient?: null | IIngredient
}) {


    // --------------- FADE IN/OUT ANIMATION  ---------------


    // --------------- CLOSING LOGIC ---------------

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


    // --------------- MODAL OVERLAY  ---------------

    function ModalOverlay(props: IModalOverlayProps) {

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