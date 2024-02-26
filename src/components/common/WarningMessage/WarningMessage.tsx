import styles from "./WarningMessage.module.scss"
import Modal from "components/common/Modal/Modal.tsx";
import {Link} from "react-router-dom";

export default function WarningMessage() {
	
	return (
		<Modal>
			<div
				className={`${styles.message} ${styles.messageError}`}
			>
				<p>Произошла какая-то непонятная нам ошибка!
					
					<br/>Но Вы не переживайте - Ваши деньги за бургер мы получили!</p>
				<Link
					to={'/'}>На главную</Link>
			
			</div>
		</Modal>
	
	);
}