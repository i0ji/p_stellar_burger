import modalOverlayStyles from "./ModalOverlayStyles.module.scss";
import {IModalOverlayProps} from "interfaces/interfaces";
import {useSelector} from "react-redux";

export default function ModalOverlay(props: IModalOverlayProps) {
    
    const hasError = useSelector(state => state.orderSlice.error);
    
    return (
        <div
            className={`${modalOverlayStyles.modal_overlay} ${hasError && modalOverlayStyles.modal_error}`}
            onClick={props.onClose}
        >
            {props.children}
        </div>
    );
}