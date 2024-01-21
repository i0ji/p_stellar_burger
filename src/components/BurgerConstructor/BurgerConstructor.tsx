import React from "react";
import constructorStyles from "./BurgerConstructor.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "components/BurgerConstructor/IngredientCard/IngredientCard.tsx";
import ingredients_data from "data/ingredients_data.json"

{/* -----INGREDIENT ARRAYS -----*/}
const ingredients = ingredients_data
const bunIngredients = ingredients.filter(elem => elem.type === "bun");
const sauceIngredients = ingredients.filter(elem => elem.type === "sauce");
const mainIngredients = ingredients.filter(elem => elem.type === "main");


export default function BurgerConstructor() {
    const [current, setCurrent] = React.useState('one')

    return (
        <section className={constructorStyles.constructor_block}>

            <h3 className="text text_type_main-large pb-5">Соберите бургер</h3>

            {/* -----INGREDIENT TABS -----*/}
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

            {/* -----INGREDIENT GROUPS -----*/}
            <div className={constructorStyles.ingredient_list}>

                <div className={constructorStyles.ingredient_group}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <IngredientCard ingredient_data={bunIngredients}/>
                </div>

                <div className={constructorStyles.ingredient_group}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <IngredientCard ingredient_data={sauceIngredients}/>
                </div>

                <div className={constructorStyles.ingredient_group}>
                    <h3 className="text text_type_main-medium">Начинки</h3>
                    <IngredientCard ingredient_data={mainIngredients}/>
                </div>

            </div>

        </section>
    )
}