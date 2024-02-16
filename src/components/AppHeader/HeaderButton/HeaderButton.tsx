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
                <a href="#">
                    <div className={headerButtonStyles.header_button}>
                        <BurgerIcon
                            type={isActive ? 'primary' : "secondary"}
                        />
                        <Button
                            onMouseEnter={buttonHovered}
                            onMouseLeave={buttonHovered}
                            style={{color:isActive ? '#F2F2F2' : "#8585AD"}}
                            extraClass={`${headerButtonStyles.header_button_color} ${headerButtonPaddings}`}
                            htmlType="button"
                            type="secondary"
                            size="medium"
                        >
                            Конструктор
                        </Button>
                    </div>
                </a>
            )
        case 'orders':
            return (

                <a href="#">
                    <div
                        className={headerButtonStyles.header_button}
                    >
                        <ListIcon
                            type={isActive ? "primary" : "secondary"}
                        />
                        <Button
                            onMouseEnter={buttonHovered}
                            onMouseLeave={buttonHovered}
                            style={{color:isActive ? '#F2F2F2' : "#8585AD"}}
                            extraClass={`${headerButtonPaddings} ${headerButtonStyles.header_button_disabled}`}
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
                    >
                        <ProfileIcon
                            type={isActive ? "primary" : "secondary"}
                        />
                        <Button
                            onMouseEnter={buttonHovered}
                            onMouseLeave={buttonHovered}
                            style={{color:isActive ? '#F2F2F2' : "#8585AD"}}
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
