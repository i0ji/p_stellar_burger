import {useEffect, useState} from "react";
import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
// import {getIngredients} from "src/utils/burger-api.ts";
import {IIngredient} from "src/Interfaces";


import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "services/slices/ingredinetsSlice.ts";


export default function App() {
	
	
	// NEW RTK CODE
	const dispatch = useDispatch();
	const ingredients = useSelector((state) => state.ingredients.list);
	const status = useSelector((state) => state.ingredients.status);
	const error = useSelector((state) => state.ingredients.error);
	
	
	const [state, setState] = useState({
		ingredientsData: [],
		error: null
	});
	
	const {ingredientsData, error} = state;
	
	// useEffect(() => {
	//     getIngredients()
	//         .then(data => setState({ingredientsData: data, error: null}))
	//         .catch(err => setState({ingredientsData: [], error: err.message}));
	// }, []);
	
	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);
	
	// Обработка статуса запроса и данных
	if (status === 'loading') {
		return <p>Loading...</p>;
	}
	
	if (status === 'failed') {
		return <p>Error: {error}</p>;
	}
	
	
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
			{/* ----- APP HEADER -----*/}
			
			<AppHeader/>
			
			{/* ----- TWO MAIN BLOCKS -----*/}
			
			<main className={appStyles.burger_builder}>
				{state.error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (
					<>
						<BurgerIngredients ingredientsData={ingredientsData}/>
						
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