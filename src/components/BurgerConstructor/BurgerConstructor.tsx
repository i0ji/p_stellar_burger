import React from "react";
import constructorStyles from "./BurgerConstructor.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "components/BurgerConstructor/IngredientCard/IngredientCard.tsx";
import ingredients_data from "data/ingredients_data.json"

{/* -----INGREDIENT ARRAYS -----*/}
const ingredients  =  ingredients_data
const bunIngredient = ingredients.filter(elem => elem.type === "bun");
const sauceIngredient  = ingredients.filter(elem => elem.type === "sauce");
const mainIngredient = ingredients.filter(elem => elem.type === "main");


export default function BurgerConstructor() {
    const [current, setCurrent] = React.useState('one')

    return (
        <section className={constructorStyles.constructor_block}>

            <p className="text text_type_main-large pb-5">Соберите бургер</p>

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
                    <IngredientCard ingredient_data={bunIngredient}/>
                </div>

                <div className={constructorStyles.constructor_ingredient_group}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <IngredientCard ingredient_data={sauceIngredient}/>
                </div>

                <div className={constructorStyles.constructor_ingredient_group}>
                    <h3 className="text text_type_main-medium">Начинки</h3>
                    <IngredientCard ingredient_data={mainIngredient}/>
                </div>

            </div>


        </section>
    );
};