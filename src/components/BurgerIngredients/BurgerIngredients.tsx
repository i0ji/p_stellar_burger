import React, {useRef , useState, useMemo, useEffect} from "react";

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
	
	
	// ----------------- NEW TAB SWITCH LOGIC -----------------
	// const [current, setCurrent] = React.useState(TabValues.Bun);

	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);
	
	
	const [current, setCurrent] = React.useState(TabValues.Bun);
	const [bunVisible, setBunVisible] = useState(false);
	const [sauceVisible, setSauceVisible] = useState(false);
	const [mainVisible, setMainVisible] = useState(false);
	
	const updateVisibility = (ref, setVisible) => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setVisible(
				rect.top >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
			);
		}
	};
	
	useEffect(() => {
		const handleScroll = () => {
			updateVisibility(bunRef, setBunVisible);
			updateVisibility(sauceRef, setSauceVisible);
			updateVisibility(mainRef, setMainVisible);
		};
		
		window.addEventListener("scroll", handleScroll);
		
		// Cleanup event listener
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [bunRef, sauceRef, mainRef]);
	
	useEffect(() => {
		if (bunVisible) {
			setCurrent(TabValues.Bun);
		} else if (sauceVisible) {
			setCurrent(TabValues.Sauce);
		} else if (mainVisible) {
			setCurrent(TabValues.Main);
		}
	}, [bunVisible, sauceVisible, mainVisible]);
	
	const scrollToRef = (ref) => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	};
	
	const handleTabClick = (value) => {
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// ----------------- TAB SWITCH LOGIC -----------------
	
	// const [current, setCurrent] = React.useState(TabValues.Bun);
	//
	// const bunRef = useRef<HTMLDivElement>(null);
	// const sauceRef = useRef<HTMLDivElement>(null);
	// const mainRef = useRef<HTMLDivElement>(null);
	//
	// const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
	// 	if (ref && ref.current) {
	// 		ref.current.scrollIntoView({
	// 			behavior: "smooth",
	// 			block: "start",
	// 			inline: "nearest",
	// 		});
	// 	}
	// };
	// const handleTabClick = (value: TabValues) => {
	// 	if (value !== current) {
	// 		setCurrent(value);
	// 		switch (value) {
	// 			case TabValues.Bun:
	// 				scrollToRef(bunRef);
	// 				break;
	// 			case TabValues.Sauce:
	// 				scrollToRef(sauceRef);
	// 				break;
	// 			case TabValues.Main:
	// 				scrollToRef(mainRef);
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 	}
	// };
	//
	
	
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