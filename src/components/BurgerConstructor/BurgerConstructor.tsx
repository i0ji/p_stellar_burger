import React from "react";
import constructorStyles from "./BurgerConstructor.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerConstructor/IngredientGroup/IngredientGroup.tsx";
import ingredients_data from "data/ingredients_data.json"

{/* -----INGREDIENT ARRAYS -----*/
}
const ingredients = ingredients_data

const bunIngredients =
    {ingredients: ingredients.filter(elem => elem.type === "bun"), type: 'Булки'}
const sauceIngredients =
    {ingredients: ingredients.filter(elem => elem.type === "sauce"), type: 'Соусы'}
const mainIngredients =
    {ingredients: ingredients.filter(elem => elem.type === "main"), type: 'Начинки'}


export default function BurgerConstructor() {
    const [current, setCurrent] = React.useState('one')

    return (
        <section className={constructorStyles.constructor_block}>

            <h3 className="text text_type_main-large pb-5">Соберите бургер</h3>

            {/* -----INGREDIENT TABS -----*/}
            <div className={constructorStyles.constructor_menu}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    {bunIngredients.type}
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    {sauceIngredients.type}
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    {mainIngredients.type}
                </Tab>
            </div>

            {/* -----INGREDIENT GROUPS -----*/}
            <div className={constructorStyles.ingredient_list}>
                <IngredientGroup
                    type={bunIngredients.type}
                    ingredients={bunIngredients.ingredients}
                />
                <IngredientGroup
                    type={sauceIngredients.type}
                    ingredients={sauceIngredients.ingredients}
                />
                <IngredientGroup
                    type={mainIngredients.type}
                    ingredients={mainIngredients.ingredients}
                />
            </div>

        </section>
    )
}