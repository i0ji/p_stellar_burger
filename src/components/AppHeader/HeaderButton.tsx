import {Button, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

export default function HeaderButton({typeFor}: { typeFor: string }) {

    const activeStyle = ({isActive}: { isActive: boolean }) => {
        return isActive ? 'active' : 'not_active';
    }

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
        case 'orders':
            return (
                <NavLink
                    className={activeStyle}
                    to="/orders"
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
                    className={activeStyle}
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