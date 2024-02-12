import React, {useEffect} from "react";
import {createPortal} from "react-dom";

import modalStyles from "./ModalStyles.module.scss"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "modal/ModalOverlay/ModalOverlay.tsx";


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
					<div className={modalStyles.modal}>
						<div className={modalStyles.modal_btn}>
							<CloseIcon
								type="primary"
								onClick={onClose}
							/>
						</div>
						{children}
					</div>
				</>
			), modalPlacement);
}