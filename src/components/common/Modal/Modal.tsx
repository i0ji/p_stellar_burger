import React, {useEffect} from "react";
import {createPortal} from "react-dom";

import styles from "./ModalStyles.module.scss"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "components/common/Modal/ModalOverlay/ModalOverlay.tsx";
import {IIngredient} from "interfaces/interfaces";

const modalPlacement = document.querySelector('#root');

export default function Modal({onClose, children, selectedIngredient,}: {
	onClose?: () => void,
	children: React.ReactNode,
	selectedIngredient?: null | IIngredient
}) {
	
	useEffect(() => {
		
		const closeOnEscapeKey = (e: KeyboardEvent) => {
			if (onClose) (e.key === "Escape" ? onClose() : null);
		}
		
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
					<div
						className={styles.modal}>
						<div className={styles.modal_btn}>
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