import styles from "./ModalOverlayStyles.module.scss";
import {IModalOverlayProps} from "interfaces/interfaces";
import {useSelector} from "react-redux";

export default function ModalOverlay(props: IModalOverlayProps) {
    
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