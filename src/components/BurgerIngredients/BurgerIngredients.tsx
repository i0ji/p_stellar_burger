import React, {useEffect, useRef, useMemo} from "react";
import burgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";
import {useSelector} from "react-redux";

enum TabValues {
    Bun = "bun",
    Sauce = "sauce",
    Main = "main",
}

export default function BurgerIngredients() {

    // --------------- GET DATA FROM STORE ---------------
    const {ingredients: ingredientsData} = useSelector(state => state.ingredients);

    // --------------- INGREDIENTS FILTERED ARRAYS ---------------

    const filteredIngredients = useMemo(() => {
        return {
            bun: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "bun") : [],
            sauce: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "sauce") : [],
            main: Array.isArray(ingredientsData) ? ingredientsData.filter((item) => item.type === "main") : [],
        };
    }, [ingredientsData]);

    // ----------------- TAB SWITCH LOGIC -----------------
    const [current, setCurrent] = React.useState(TabValues.Bun);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };
    const handleTabClick = (value: TabValues) => {
        if (value !== current) {
            setCurrent(value);
            switch (value) {
                case TabValues.Bun:
                    scrollToRef(bunRef);
                    break;
                case TabValues.Sauce:
                    scrollToRef(sauceRef);
                    break;
                case TabValues.Main:
                    scrollToRef(mainRef);
                    break;
                default:
                    break;
            }
        }
    };









// ... (previous code)// ... (previous code)// ... (previous code)// ... (previous code)
    const [activeTab, setActiveTab] = React.useState(TabValues.Bun);
    const handleScroll = () => {
        const bunTop = bunRef.current?.getBoundingClientRect().top || 0;
        const sauceTop = sauceRef.current?.getBoundingClientRect().top || 0;
        const mainTop = mainRef.current?.getBoundingClientRect().top || 0;

        if (bunTop >= 0 && bunTop < bunRef.current?.offsetHeight) {
            setActiveTab(TabValues.Bun);
        } else if (sauceTop >= 0 && sauceTop < sauceRef.current?.offsetHeight) {
            setActiveTab(TabValues.Sauce);
        } else if (mainTop >= 0 && mainTop < mainRef.current?.offsetHeight) {
            setActiveTab(TabValues.Main);
        }
    };
    useEffect(() => {
        const container = document.getElementById("burgerIngredientsContainer");
        container?.addEventListener("scroll", handleScroll);

        return () => {
            container?.removeEventListener("scroll", handleScroll);
        };
    }, []);









    return (
        <section
            className={burgerIngredientsStyles.ingredients_block}
            id="burgerIngredientsContainer"
        >
            <h1 className="text text_type_main-large pb-10">Соберите бургер</h1>

            {/* -------------------- INGREDIENT GROUPS MENU -------------------- */}
            <div className={burgerIngredientsStyles.ingredients_menu}>
                <Tab
                    value={TabValues.Bun}
                    active={current === TabValues.Bun}
                    onClick={() => handleTabClick(TabValues.Bun)}
                >
                    Булки
                </Tab>
                <Tab
                    value={TabValues.Sauce}
                    active={current === TabValues.Sauce}
                    onClick={() => handleTabClick(TabValues.Sauce)}
                >
                    Соусы
                </Tab>
                <Tab
                    value={TabValues.Main}
                    active={current === TabValues.Main}
                    onClick={() => handleTabClick(TabValues.Main)}
                >
                    Начинки
                </Tab>
            </div>

            {/* -------------------- INGREDIENT GROUPS -------------------- */}
            <div className={burgerIngredientsStyles.ingredients_list}>
                <div ref={bunRef}>
                    <IngredientGroup
                        type="Булки"
                        ingredients={filteredIngredients.bun}
                    />
                </div>
                <div ref={sauceRef}>
                    <IngredientGroup
                        type="Соусы"
                        ingredients={filteredIngredients.sauce}
                    />
                </div>
                <div ref={mainRef}>
                    <IngredientGroup
                        type="Начинки"
                        ingredients={filteredIngredients.main}
                    />
                </div>
            </div>
        </section>
    );
}