import React, {useRef, useMemo, useContext} from "react";
import burgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "components/BurgerIngredients/IngredientGroup/IngredientGroup.tsx";
import {IngredientsContext} from "services/ingredientsContext.ts";
import {IIngredient} from "src/Interfaces";

enum TabValues {
	Bun = "bun",
	Sauce = "sauce",
	Main = "main",
}

export default function BurgerIngredients() {
	
	const ingredientsDataContext = useContext(IngredientsContext);
	
	
	// ------ SCROLL LOGIC ------
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
	
	const filteredIngredients = useMemo(() => {
		return {
			bun: ingredientsDataContext.filter((item: IIngredient) => item.type === "bun"),
			sauce: ingredientsDataContext.filter((item: IIngredient) => item.type === "sauce"),
			main: ingredientsDataContext.filter((item: IIngredient) => item.type === "main"),
		};
	}, [ingredientsDataContext]);
	
	
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
	
	return (
		<section className={burgerIngredientsStyles.ingredients_block}>
			<h1 className="text text_type_main-large pb-10">Соберите бургер</h1>
			
			{/* ----- INGREDIENT GROUPS MENU ----- */}
			<div className={burgerIngredientsStyles.ingredients_menu}>
				<Tab
					value={TabValues.Bun} active={current === TabValues.Bun}
					onClick={() => handleTabClick(TabValues.Bun)}
				>
					Булки
				</Tab>
				<Tab
					value={TabValues.Sauce} active={current === TabValues.Sauce}
					onClick={() => handleTabClick(TabValues.Sauce)}
				>
					Соусы
				</Tab>
				<Tab
					value={TabValues.Main} active={current === TabValues.Main}
					onClick={() => handleTabClick(TabValues.Main)}
				>
					Начинки
				</Tab>
			</div>
			
			{/* ----- INGREDIENT GROUPS ----- */}
			<div className={burgerIngredientsStyles.ingredients_list}>
				<div ref={bunRef}>
					<IngredientGroup type="Булки" ingredients={filteredIngredients.bun}/>
				</div>
				<div ref={sauceRef}>
					<IngredientGroup type="Соусы" ingredients={filteredIngredients.sauce}/>
				</div>
				<div ref={mainRef}>
					<IngredientGroup type="Начинки" ingredients={filteredIngredients.main}/>
				</div>
			</div>
		</section>
	);
}