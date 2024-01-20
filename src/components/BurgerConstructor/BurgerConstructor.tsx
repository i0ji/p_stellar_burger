import React from "react";
import constructorStyles from "./BurgerConstructor.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components"

export default function BurgerConstructor() {
    const [current, setCurrent] = React.useState('one')

    return (
        <div className={constructorStyles.constructor_block}>
            <p className="text text_type_main-medium pb-10">Соберите бургер</p>
            <div className={constructorStyles.constructor_menu}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={constructorStyles.constructor_ingredient_cards}>

            </div>
        </div>
    );
};