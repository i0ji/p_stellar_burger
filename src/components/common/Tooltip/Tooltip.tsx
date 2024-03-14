import styles from "./Tooltip.module.scss";

import {useState} from "react";


export default function Tooltip({type}: { type: string }) {
	
	const [showTooltip, setShowTooltip] = useState(false);
	
	const onMouseEnter = () => {
		setShowTooltip(true);
	};
	
	const onMouseLeave = () => {
		setShowTooltip(false);
	};
	
	
	return (
		<>
			{showTooltip &&
				<div className={styles.tooltip}>
					{type}
				</div>
			}
		</>
	);
}