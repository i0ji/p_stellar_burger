import styles from "./OrderAcceptanceStyles.module.scss";
import done from "images/Modal/done.gif"

import Modal from "common/Modal/Modal.tsx";

import {useSelector} from "hooks/reduxHooks.ts";

export default function OrderAcceptance({onClose}: { onClose: () => void }) {

    const orderNumber = useSelector(state => state.orderSlice.orderNumber)

    return (
        <Modal onClose={onClose}>
            <div className={styles.orders_modal}>
                <h1 className='text text_type_digits-large mb-8'>{orderNumber}</h1>
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img
                    className='mb-15'
                    src={done}
                    alt='Ваш заказ начали собирать'/>
                <div className={styles.orders_modal_info}>
                    <p className='text text_type_main-default mb2'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default'>Дождитесь готовности на орбитальной станции</p>
                </div>
            </div>
        </Modal>
    )
}