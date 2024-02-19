import burgerBuilderStyles from "./BurgerBuilder.module.scss"
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {useDispatch, useSelector} from "react-redux";
import {IBurgerState} from "interfaces/sliceInterfaces";
import {useEffect} from "react";
import {fetchIngredients} from "slices/ingredientsSlice.ts";
import Loader from "components/common/Loader/Loader.tsx";


export default function BurgerBuilder() {
	
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
				<>
					<BurgerIngredients/>
					
					<BurgerConstructor/>
				</>
			))}
		</main>
	);
}