import loaderStyles from "./Loader.module.scss"
import Modal from "components/common/Modal/Modal.tsx";

export default function Loader() {
	return (
		<Modal>
			<div style={{
				position: 'absolute',
				zIndex: '500',
				top: '50%',
				left: '50%'
			}}>
				<span className={loaderStyles.loader}></span>
			</div>
		</Modal>
	);
}