import headerStyles from './AppHeader.module.scss';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderButton from "./HeaderButton/HeaderButton.tsx";

export default function AppHeader() {
    return (
        <div className={headerStyles.header}>
            <nav className={headerStyles.nav}>
                <HeaderButton typeFor={"builder"} />
                <HeaderButton typeFor={"orders"}/>
            </nav>
            <Logo/>
            <HeaderButton typeFor={"profile"}/>
        </div>
    );
}