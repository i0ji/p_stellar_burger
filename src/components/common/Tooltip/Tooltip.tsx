import styles from "./Tooltip.module.scss";

export default function Tooltip({itemName, showTooltip}: { itemName: string, showTooltip: boolean}) {
	
	return (
		<>
			<span className={`${styles.tooltip} ${showTooltip ? styles.fadeIn : styles.fadeOut}`}>
				{itemName}
            </span>
		</>
	);
}