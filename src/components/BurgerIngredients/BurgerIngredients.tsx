import React, {useRef, useState} from "react";
import burgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";
import {IIngredient} from "src/Interfaces";

export default function BurgerIngredients({ingredientsData}: { ingredientsData: IIngredient[] }) {

    const [current, setCurrent] = React.useState('bun')

    const scrollToRef = useRef();

    {/* -----INGREDIENT DATA ARRAYS -----*/
    }
    const bunIngredients =
        {
            ingredients: ingredientsData.filter(elem => elem.type === "bun"),
            type: 'Булки'
        }
    const sauceIngredients =
        {
            ingredients: ingredientsData.filter(elem => elem.type === "sauce"),
            type: 'Соусы'
        }
    const mainIngredients =
        {
            ingredients: ingredientsData.filter(elem => elem.type === "main"),
            type: 'Начинки'
        }

    return (
        <section className={burgerIngredientsStyles.ingredients_block}>

            <h3 className="text text_type_main-large pb-10">Соберите бургер</h3>

            {/* -----INGREDIENT TABS -----*/}
            <div className={burgerIngredientsStyles.ingredients_menu}>
                <Tab
                    href="#buns"
                    value="bun"
                    active={current === 'bun'}
                    onClick={setCurrent}>
                    {bunIngredients.type}
                </Tab>
                <Tab value="sauce"
                     active={current === 'sauce'}
                     onClick={setCurrent}>
                    {sauceIngredients.type}
                </Tab>
                <Tab value="main"
                     active={current === 'main'}
                     onClick={setCurrent}>
                    {mainIngredients.type}
                </Tab>
            </div>

            {/* -----INGREDIENT GROUPS -----*/}
            <div className={burgerIngredientsStyles.ingredients_list}>
                <IngredientGroup
                    id="buns"
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