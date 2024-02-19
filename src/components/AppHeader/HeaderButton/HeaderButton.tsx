import headerButtonStyles from './HeaderButton.module.scss';
import {Button, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import 'styles/_theme_colors.scss'

export default function HeaderButton({typeFor}: { typeFor: string }) {

    const headerButtonPaddings: string = "p-1";

    const activeState = ({isActive}: { isActive: boolean }) => {
        return {
            color: isActive ? 'white' : 'red',
        };
    };

    switch (typeFor) {
        case 'builder':
            return (
                <NavLink
                    className={headerButtonStyles.header_button}
                    to="/constructor"
                    style={activeState}
                >
                    <BurgerIcon
                        type={"secondary"}
                    />
                    <Button
                        extraClass={`${headerButtonPaddings} text text_type_main-default`}
                        htmlType="button"
                        type="secondary"
                        size="medium"

                    >
                        Конструктор
                    </Button>
                </NavLink>

            )

        // case 'builder':
        //

        case 'orders':
            return (
                <NavLink
                    className={headerButtonStyles.header_button}
                    to="/"
                    style={activeState}

                >
                    <ListIcon
                        type="secondary"
                    />
                    <Button
                        extraClass={`${headerButtonPaddings} text text_type_main-default`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        Конструктор
                    </Button>
                </NavLink>
            )
        case 'profile':
            return (
                <NavLink
                    className={headerButtonStyles.header_button}
                    to="/login"
                    style={activeState}
                >
                    <ProfileIcon
                        type="secondary"
                    />
                    <Button
                        extraClass={`${headerButtonPaddings} text text_type_main-default`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        Конструктор
                    </Button>
                </NavLink>
            )
    }
}


