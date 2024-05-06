import {Button, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation} from "react-router-dom";
import styles from "./AppHeaderStyles.module.scss"

export default function HeaderButton({typeFor}: { typeFor: string }) {


    // --------------- VARS & STATES  ---------------

    const location = useLocation().pathname,

    activeStyle = ({isActive}: { isActive: boolean }) => {
        return isActive ? 'active' : 'not_active';
    }


    // --------------- MARKUP  ---------------

    switch (typeFor) {
        case 'builder':
            return (
                <NavLink
                    to="/"
                >

                    <Button
                        extraClass={`p-1 text text_type_main-default ${activeStyle} ${styles.header_button}`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        <BurgerIcon
                            type='primary'
                        />
                        Конструктор
                    </Button>
                </NavLink>
            )
        case 'feed':
            return (
                <NavLink
                    to="/feed"
                >

                    <Button
                        extraClass={`p-1 text text_type_main-default ${activeStyle} ${styles.header_button}`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        <ListIcon
                            type='secondary'
                        />
                        Лента заказов
                    </Button>
                </NavLink>
            )
        case 'profile':
            return (
                <NavLink
                    to="/profile"
                >

                    <Button
                        extraClass={`p-1 text text_type_main-default ${location === '/login' && styles.active} ${styles.header_button}`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        <ProfileIcon
                            type='primary'
                        />
                        Личный кабинет
                    </Button>
                </NavLink>
            )
    }
}