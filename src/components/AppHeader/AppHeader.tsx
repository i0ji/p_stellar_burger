import headerStyles from './AppHeaderStyles.module.scss';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderButton from "./HeaderButton/HeaderButton.tsx";

export default function AppHeader() {
	return (
		<header className={headerStyles.header}>
			<nav className={headerStyles.nav}>
				<HeaderButton typeFor={"builder"}/>
				<HeaderButton typeFor={"orders"}/>
			</nav>
			<div className={headerStyles.header_logo}>
				<Logo/>
			</div>
			<div className={headerStyles.header_profile}>
				<HeaderButton typeFor={"profile"}/>
			</div>
		</header>
	);
}