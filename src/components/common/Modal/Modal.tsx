import styles from "./ModalStyles.module.scss"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

export default function Modal({onClose, children}: {
    onClose?: () => void,
    children: React.ReactNode,
}) {

    const [showModal, setShowModal] = useState(false);

    // --------------- ERROR CHECK ---------------

    const hasError = useSelector(state => state.orderSlice.error);


    // --------------- CLOSING LOGIC ---------------

    useEffect(() => {
        setShowModal(false);

        setTimeout(() => {
            const closeOnEscapeKey = (e: KeyboardEvent) => {
                if (onClose) (e.key === "Escape" ? onClose() : null);
            }

            document.body.addEventListener("keydown", closeOnEscapeKey);

            return () => {
                document.body.removeEventListener("keydown", closeOnEscapeKey);
            };
        }, 250);

    }, [onClose]);

    return (
        <>
            <div
                className={`${styles.modal_overlay} ${showModal ? styles.overlayFadeIn : styles.modal_overlay} ${hasError && styles.modal_error}`}
                onClick={onClose}
            >
            </div>
            <div
                className={`${styles.modal} ${showModal ? styles.fadeIn : styles.fadeOut}`}>
                <div className={styles.modal_btn}>
                    {!hasError && <CloseIcon
                        type="primary"
                        onClick={onClose}
                    />
                    }
                </div>
                {children}
            </div>

        </>
    )
}