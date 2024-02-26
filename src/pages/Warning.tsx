import styles from "pages/Pages.module.scss"
import WarningMessage from "components/common/WarningMessage/WarningMessage.tsx";

export default function Warning() {
	return (
		<section className={styles.section}>
			<WarningMessage/>
		</section>
	);
}