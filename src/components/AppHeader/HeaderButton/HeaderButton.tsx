import headerButtonStyles from './HeaderButton.module.scss';
import {Button, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

export default function HeaderButton({typeFor}: { typeFor: string }) {

    const [isActive, setIsActive] = useState(false);

    const headerButtonPaddings: string = "pb-4 pt-4 pl-2 pr-5";

    const buttonHovered = () => {
        setIsActive(!isActive);
    }

    switch (typeFor) {
        case 'builder':
            return (
                <a
                    href="#"
                >
                    <div
                        className={headerButtonStyles.header_button}
                        onMouseEnter={buttonHovered}
                        onMouseLeave={buttonHovered}
                    >
                        <BurgerIcon
                            type={isActive ? "primary" : "secondary"}
                        />
                        <div className={headerButtonStyles.button_wrapper}>
                            <Button
                                extraClass={`${headerButtonPaddings} ${headerButtonStyles.header_button_disabled  }`}
                                htmlType="button"
                                type="secondary"
                                size="medium"
                            >
                                Конструктор
                            </Button>
                        </div>
                    </div>
                </a>
            )
        case 'orders':
            return (

                <a href="#">
                    <div
                        className={headerButtonStyles.header_button}
                        onMouseEnter={buttonHovered}
                        onMouseLeave={buttonHovered}
                    >
                        <ListIcon
                            type={isActive ? "primary" : "secondary"}
                        />
                        <Button
                            extraClass={`${headerButtonPaddings} ${headerButtonStyles.header_button_disabled  }`}
                            htmlType="button"
                            type="secondary"
                            size="medium"
                        >
                            Лента заказов
                        </Button>
                    </div>
                </a>
            )
        case 'profile':
            return (

                <a href="#">
                    <div
                        className={headerButtonStyles.header_button}
                        onMouseEnter={buttonHovered}
                        onMouseLeave={buttonHovered}
                    >
                        <ProfileIcon
                            type={isActive ? "primary" : "secondary"}
                        />
                        <Button
                            extraClass={`${headerButtonPaddings} ${headerButtonStyles.header_button_disabled}`}
                            htmlType="button"
                            type="secondary"
                            size="medium"
                        >
                            Личный кабинет
                        </Button>
                    </div>
                </a>
            )
    }
}