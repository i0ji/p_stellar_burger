import styles from "./ModalStyles.module.scss"

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useSelector} from "hooks/reduxHooks.ts";
import React, {useEffect} from "react";

import {motion, AnimatePresence} from "framer-motion";

export default function Modal({onClose, children}: {
    onClose: () => void,
    children: React.ReactNode,
}) {


    // --------------- ERROR CHECK ---------------

    const hasError = useSelector(state => state.orderSlice.error);


    // --------------- CLOSING LOGIC ---------------

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (onClose) (e.key === "Escape" ? onClose() : null);
        };
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);


    // --------------- MARKUP ---------------

    return (
        <AnimatePresence>
            <motion.div
                key="modal"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0, transition: {duration: 2.5}}}
            >
                <div
                    className={`${styles.modal_overlay}  ${hasError && styles.modal_error}`}
                    onClick={onClose}
                    data-testid="modal_overlay"
                >
                </div>
                <div
                    className={`${styles.modal}`}>
                    <div className={styles.modal_btn}>
                        {!hasError && <CloseIcon
                            type="primary"
                            onClick={onClose}
                        />
                        }
                    </div>
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}