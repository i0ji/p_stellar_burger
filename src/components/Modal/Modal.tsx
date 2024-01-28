import modalStyles from "./ModalStyles.module.scss"
import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import ModalOverlay from "modal/ModalOverlay/ModalOverlay.tsx";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalPlacement = document.querySelector('#modals');

export default function Modal({onClose, children}: { onClose: () => void, children: React.ReactNode }) {

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? onClose() : null);
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);

    if (modalPlacement)

        return createPortal(
            (
                <>
                    <ModalOverlay onClose={onClose}/>
                    <div className={`${modalStyles.modal} pr-10 pb-15`}>
                        <div className={modalStyles.close_btn}>
                            <CloseIcon
                                type="primary"
                                onClick={onClose}
                            />
                        </div>
                        {children}
                    </div>
                </>), modalPlacement);
}