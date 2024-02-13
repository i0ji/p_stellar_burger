import React, { useRef, useEffect, useMemo, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";
import burgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";

enum TabValues {
    Bun = "bun",
    Sauce = "sauce",
    Main = "main",
}

export default function BurgerIngredients() {
    const { ingredients: ingredientsData } = useSelector((state) => state.ingredients);

    const filteredIngredients = useMemo(() => {
        return {
            bun: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "bun") : [],
            sauce: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "sauce") : [],
            main: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "main") : [],
        };
    }, [ingredientsData]);

    const [current, setCurrent] = useState(TabValues.Bun);

    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px 0px 15px 0px",
            threshold: 0.51,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target.id) {
                        case "bunSection":
                            setCurrent(TabValues.Bun);
                            break;
                        case "sauceSection":
                            setCurrent(TabValues.Sauce);
                            break;
                        // default "mainSection":
                        //     setCurrent(TabValues.Main);
                        //     break;
                        default:
                            setCurrent(TabValues.Main);
                            break;
                    }
                }
            });
        }, options);

        if (bunRef.current) {
            observer.observe(bunRef.current);
        }
        if (sauceRef.current) {
            observer.observe(sauceRef.current);
        }
        if (mainRef.current) {
            observer.observe(mainRef.current);
        }

        // Cleanup the observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, [bunRef, sauceRef, mainRef]);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    return (
        <section className={burgerIngredientsStyles.ingredients_block} id="burgerIngredientsContainer">
            <h1 className="text text_type_main-large pb-10">Соберите бургер</h1>

            <div className={burgerIngredientsStyles.ingredients_menu}>
                <Tab value={TabValues.Bun} active={current === TabValues.Bun} onClick={() => scrollToRef(bunRef)}>
                    Булки
                </Tab>
                <Tab value={TabValues.Sauce} active={current === TabValues.Sauce} onClick={() => scrollToRef(sauceRef)}>
                    Соусы
                </Tab>
                <Tab value={TabValues.Main} active={current === TabValues.Main} onClick={() => scrollToRef(mainRef)}>
                    Начинки
                </Tab>
            </div>

            <div className={burgerIngredientsStyles.ingredients_list}>
                <div id="bunSection" ref={bunRef}>
                    <IngredientGroup type="Булки" ingredients={filteredIngredients.bun} />
                </div>
                <div id="sauceSection" ref={sauceRef}>
                    <IngredientGroup type="Соусы" ingredients={filteredIngredients.sauce} />
                </div>
                <div id="mainSection" ref={mainRef}>
                    <IngredientGroup type="Начинки" ingredients={filteredIngredients.main} />
                </div>
            </div>
        </section>
    );
}