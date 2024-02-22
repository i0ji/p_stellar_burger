import styles from "./WarningMessage.module.scss"
import Modal from "components/common/Modal/Modal.tsx";

export default function WarningMessage() {
	
	return (
		<Modal>
			<div
				className={`${styles.message} ${styles.messageError}`}
			>
				<p>Произошла какая-то непонятная нам ошибка!
					<br/>Но Вы не переживайте - Ваши деньги за бургер мы получили!</p>
			</div>
		</Modal>
	
	);
}