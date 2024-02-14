import loaderStyles from "./Loader.module.scss"
import ModalOverlay from "components/common/Modal/ModalOverlay/ModalOverlay.tsx";

export default function Loader() {
	return (
		<ModalOverlay>
			<div style={{
				position: 'absolute',
				zIndex: '500',
				top: '50%',
				left: '50%'
			}}>
				<span className={loaderStyles.loader}></span>
			</div>
		</ModalOverlay>
	);
}