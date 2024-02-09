import {useEffect} from "react";
import AppStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";

import {useDispatch, useSelector} from 'react-redux';
import {fetchIngredients} from 'services/slices/ingredientsListSlice.ts';
import {IBurgerState, IIngredient} from "src/Interfaces";

export default function App() {
	
	const dispatch = useDispatch();
	const {ingredients: ingredientsData, status, error}: IBurgerState = useSelector((state: {
		ingredients: IBurgerState
	}) => state.ingredients);
	
	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);
	
	
	// --------------- STATUSES ---------------
	if (status === 'loading') {
		return <p className={AppStyles.status}>Загрузка...</p>;
	}
	
	if (status === 'failed') {
		return <p className={AppStyles.status}>Ошибка: {error}</p>;
	}
	
	//
	const bunData: IIngredient[] = (ingredientsData as IIngredient[])
		.filter((ingredient) => ingredient.type === 'bun')
		.slice(0, 2);
	
	function randomData(data: IIngredient[], qty: number) {
		const innerIngredients = data.filter(elem => elem.type !== 'bun');
		const randomData = [...innerIngredients].sort(() => .5 - Math.random());
		return randomData.slice(0, qty);
	}
	
	return (
		<>
			{/* --------------- APP HEADER --------------- */}
			
			<AppHeader/>
			
			{/* --------------- MAIN BLOCKS --------------- */}
			<main className={AppStyles.burger_builder}>
				{error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (
					<>
						<BurgerIngredients/>
						
						<BurgerConstructor
							ingredientsData={randomData(ingredientsData, 7)}
							bunData={bunData}
						/>
					</>
				))}
			</main>
		</>
	)
}