import orderDetailsStyles from "./OrderDetailsStyles.module.scss";
import done_png from "images/Modal/done.png";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "modal/ModalOverlay/ModalOverlay.tsx";
import {createPortal} from "react-dom";
import {useEffect} from "react";
import {IOrderDetailsProps} from "src/Interfaces";

export default function OrderDetails({onClose}: IOrderDetailsProps) {

    const modalPlacement = document.querySelector('#modals');

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? onClose() : null);
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);

    return createPortal(
        (
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={orderDetailsStyles.orders_modal}>
                    <CloseIcon
                        type="primary"
                        onClick={onClose}
                    />
                    <h1 className="text text_type_digits-large mb-8">034567</h1>
                    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                    <img
                        className="mb-15"
                        src={done_png}
                        alt="Ваш заказ начали собирать"/>
                    <div className={orderDetailsStyles.orders_modal_info}>
                        <p className="text text_type_main-default mb2">Ваш заказ начали готовить</p>
                        <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
                    </div>
                </div>
            </>
        ), modalPlacement!);
}