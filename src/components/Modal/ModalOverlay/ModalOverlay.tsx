import modalOverlayStyles from "./ModalOverlayStyles.module.scss";
import {IModalOverlayProps} from "src/Interfaces";

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