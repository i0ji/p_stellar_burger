import burgerBuilderStyles from "./BurgerBuilder.module.scss"
import {IBurgerState} from "interfaces/sliceInterfaces";

import Loader from "components/common/Loader/Loader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchIngredients} from "slices/ingredientsSlice.ts";

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";

export default function HomePage() {
	
	const dispatch = useDispatch();
	
	const {ingredients: ingredientsData, status, error}: IBurgerState = useSelector((state: {
		ingredients: IBurgerState
	}) => state.ingredients);
	
	
	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);
	
	
	// --------------- STATUSES ---------------
	if (status === 'loading') {
		return <Loader/>;
	}
	
	if (status === 'failed') {
		return <p className={burgerBuilderStyles.status}>Ошибка: {error}</p>;
	}
	
	
	return (
		<main>
			{error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (
				<section className={burgerBuilderStyles.burger_builder}>
					<DndProvider backend={HTML5Backend}>
						
						<div className={burgerBuilderStyles.container}>
							<BurgerIngredients/>
							
							<BurgerConstructor/>
						</div>
					</DndProvider>
				</section>
			))}
		</main>
	);
}