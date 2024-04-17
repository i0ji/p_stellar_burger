import {Button, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation} from "react-router-dom";
import styles from "./AppHeaderStyles.module.scss";

export default function HeaderButton({typeFor}: { typeFor: string }) {


    // --------------- VARS & STATES  ---------------

    const location = useLocation();
    console.log(location.pathname);

    const activeStyle = ({isActive}: { isActive: boolean }) => {
        return isActive ? 'active' : 'not_active';
    }

    const loginPathname = (location.pathname === '/login')


    // --------------- COMPONENT  ---------------

    switch (typeFor) {
        case 'builder':
            return (
                <NavLink
                    className={activeStyle}
                    to="/"
                >
                    <BurgerIcon
                        type='primary'
                    />
                    <Button
                        extraClass='p-1 text text_type_main-default'
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        Конструктор
                    </Button>
                </NavLink>
            )
        case 'feed':
            return (
                <NavLink
                    className={activeStyle}
                    to="/feed"
                >
                    <ListIcon
                        type='secondary'
                    />
                    <Button
                        extraClass='p-1 text text_type_main-default'
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        Лента заказов
                    </Button>
                </NavLink>
            )
        case 'profile':
            return (
                <NavLink
                    className={activeStyle   (loginPathname && 'active')}
                    // to={"/profile" || "/login"}
                    to="/profile"
                >
                    <ProfileIcon
                        type='primary'
                    />
                    <Button
                        extraClass='p-1 text text_type_main-default'
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        Личный кабинет
                    </Button>
                </NavLink>
            )
    }
}