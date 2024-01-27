import modalOverlayStyles from "./ModalOverlayStyles.module.scss"

export default function ModalOverlay(props) {
    return (
        <div className={modalOverlayStyles.modal_overlay}>
            {props.children}
        </div>
    );
}