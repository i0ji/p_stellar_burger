import warningMessageStyle from "./WarningMessage.module.scss"
import ModalOverlay from "components/common/Modal/ModalOverlay/ModalOverlay.tsx";

export default function WarningMessage() {
	
	return (
		<ModalOverlay>
			<div
				className={`${warningMessageStyle.message} ${warningMessageStyle.messageError}`}
			>
				<p>Произошла какая-то непонятная нам ошибка!
					<br/>Но Вы не переживайте - Ваши деньги за бургер мы получили!</p>
			</div>
		</ModalOverlay>
	
	);
}