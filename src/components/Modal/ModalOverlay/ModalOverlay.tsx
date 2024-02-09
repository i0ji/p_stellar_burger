import modalOverlayStyles from "./ModalOverlayStyles.module.scss";
import {IModalOverlayProps} from "interfaces/interfaces";

export default function ModalOverlay(props: IModalOverlayProps) {

    return (
        <div
            className={modalOverlayStyles.modal_overlay}
            onClick={props.onClose}
        >
            {props.children}
        </div>
    );
}