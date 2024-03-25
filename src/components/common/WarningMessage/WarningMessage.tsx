import styles from "./WarningMessage.module.scss"

import {Link} from "react-router-dom";

import Modal from "common/Modal/Modal.tsx";

export default function WarningMessage({onClose}: { onClose: () => void }) {

    return (
        <Modal onClose={onClose}>
            <div
                className={`${styles.message} ${styles.messageError}`}
            >
                <p>Произошла какая-то непонятная нам ошибка!

                    <br/>Но Вы не переживайте - Ваши деньги за бургер мы получили!</p>
                <Link
                    to='/'>На главную</Link>
            </div>
        </Modal>

    );
}