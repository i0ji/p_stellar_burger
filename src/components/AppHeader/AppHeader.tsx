import headerStyles from './AppHeaderStyles.module.scss';

import HeaderButton from "./HeaderButton/HeaderButton.tsx";
import {Link} from "react-router-dom";

import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
	return (
		<header className={headerStyles.header}>
			<nav className={headerStyles.nav}>
				<ul>
					<li>
						<HeaderButton typeFor={"builder"}/>
					</li>
					<li>
						<HeaderButton typeFor={"orders"}/>
					</li>
				</ul>
				<div className={headerStyles.header_logo}>
					<Link to="/">
					<Logo/>
					</Link>
				</div>
				<div className={headerStyles.header_profile}>
					<HeaderButton typeFor={"profile"}/>
				</div>
			</nav>
		</header>
	);
}