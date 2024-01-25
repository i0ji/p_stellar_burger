import React from "react";
import BurgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";
import {IIngredient} from "src/Interfaces";

export default function BurgerIngredients({ingredientsData}: { ingredientsData: IIngredient[] }) {

    const [current, setCurrent] = React.useState('one')

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
        <section className={BurgerIngredientsStyles.ingredients_block}>

            <h3 className="text text_type_main-large pb-5">Соберите бургер</h3>

            {/* -----INGREDIENT TABS -----*/}
            <div className={BurgerIngredientsStyles.ingredients_menu}>
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
            <div className={BurgerIngredientsStyles.ingredients_list}>
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