import styles from './AppHeaderStyles.module.scss'

import {Link} from "react-router-dom";

import HeaderButton from "./HeaderButton.tsx";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul>
					<li>
						<HeaderButton typeFor={"builder"}/>
					</li>
					<li>
						<HeaderButton typeFor={"feed"}/>
					</li>
				</ul>
				<div className={styles.header_logo}>
					<Link
						to="/">
						<Logo/>
					</Link>
				</div>
				<div className={styles.header_profile}>
					<HeaderButton typeFor={"profile"}/>
				</div>
			</nav>
		</header>
	);
}