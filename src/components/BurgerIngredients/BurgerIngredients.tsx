import styles from "./BurgerIngredientsStyles.module.scss"

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";

import React, {useRef, useEffect, useMemo, useState} from "react";
import {useSelector} from "hooks/reduxHooks.ts";

enum TabValues {
    Bun = "bun",
    Sauce = "sauce",
    Main = "main",
}

export default function BurgerIngredients() {


    // --------------- VARS/STATES ---------------

    const {ingredients: ingredientsData} = useSelector(state => state.ingredients);

    const filteredIngredients = useMemo(() => {
        return {
            bun: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "bun") : [],
            sauce: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "sauce") : [],
            main: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "main") : [],
        };
    }, [ingredientsData]);


    // --------------- SCROLL LOGIC  ---------------

    const [current, setCurrent] = useState(TabValues.Bun);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const observerArea = document.getElementById('burgerIngredientGroups')

    useEffect(() => {
        const options = {
            root: observerArea,
            rootMargin: "-50px 0px -450px 0px",
            threshold: 0,
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
                        case "mainSection":
                            setCurrent(TabValues.Main);
                            break;
                        default:
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
        return () => {
            observer.disconnect();
        };
    }, [bunRef, sauceRef, mainRef, observerArea]);

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
        <section
            className={styles.ingredients_block}
            id="burgerIngredientsContainer"
        >
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <div className={styles.ingredients_menu}>
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

            <div
                className={styles.ingredients_list}
                id="burgerIngredientGroups"
            >
                <div id="bunSection" ref={bunRef}>
                    <IngredientGroup type="Булки" ingredients={filteredIngredients.bun}/>
                </div>
                <div id="sauceSection" ref={sauceRef}>
                    <IngredientGroup type="Соусы" ingredients={filteredIngredients.sauce}/>
                </div>
                <div id="mainSection" ref={mainRef}>
                    <IngredientGroup type="Начинки" ingredients={filteredIngredients.main}/>
                </div>

            </div>
        </section>
    );
}