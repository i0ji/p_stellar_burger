import React, {useRef} from "react";
import burgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";
import {IIngredient} from "src/Interfaces";

export default function BurgerIngredients({ingredientsData}: { ingredientsData: IIngredient[] }) {
    const [current, setCurrent] = React.useState("bun");
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    const handleTabClick = (value: string) => {
        if (value !== current) {
            setCurrent(value);
            switch (value) {
                case "bun":
                    scrollToRef(bunRef);
                    break;
                case "sauce":
                    scrollToRef(sauceRef);
                    break;
                case "main":
                    scrollToRef(mainRef);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <section className={burgerIngredientsStyles.ingredients_block}>
            <h1 className="text text_type_main-large pb-10">Соберите бургер</h1>

            <div className={burgerIngredientsStyles.ingredients_menu}>
                <Tab value="bun" active={current === "bun"} onClick={() => handleTabClick("bun")}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={() => handleTabClick("sauce")}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === "main"} onClick={() => handleTabClick("main")}>
                    Начинки
                </Tab>
            </div>

            <div className={burgerIngredientsStyles.ingredients_list}>
                <div ref={bunRef}>
                    <IngredientGroup

                        type="Булки"
                        ingredients={ingredientsData.filter((elem) => elem.type === "bun")}
                    />
                </div>
                <div ref={sauceRef}>
                    <IngredientGroup
                        type="Соусы"
                        ingredients={ingredientsData.filter((elem) => elem.type === "sauce")}
                    />
                </div>
                <div ref={mainRef}>
                    <IngredientGroup
                        type="Начинки"
                        ingredients={ingredientsData.filter((elem) => elem.type === "main")}
                    />
                </div>
            </div>
        </section>
    );
}