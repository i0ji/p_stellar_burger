import headerStyles from './AppHeaderStyles.module.scss';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderButton from "./HeaderButton/HeaderButton.tsx";

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
                    <Logo/>
                </div>
                <div className={headerStyles.header_profile}>
                    <HeaderButton typeFor={"profile"}/>
                </div>
            </nav>
        </header>
    );
}