import {useEffect, useState} from "react";
import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {getIngredients} from "src/utils/burger-api.ts";
import {IIngredient} from "src/Interfaces";

import {BurgerIngredientsContext} from "services/ingredientsContext.ts";


export default function App() {
	const [state, setState] = useState({
		ingredientsData: [], error: null
	});
	
	const {ingredientsData, error} = state;
	
	{/* ----- GET DATA ON MOUNT ----- */
	}
	
	useEffect(() => {
		getIngredients()
			.then(data => setState(prevState => ({...prevState, ingredientsData: data})))
			.catch(err => {
				setState(prevState => ({...prevState, error: err.message}));
				console.error(err);
			});
	}, []);
	

	{ /* ----- DATA RANDOMIZER ----- */
	}
	
	function randomData(data: IIngredient[], qty: number) {
		const innerIngredients = data.filter(elem => elem.type !== 'bun');
		
		const randomData = [...innerIngredients].sort(() => .5 - Math.random());
		
		return randomData.slice(0, qty);
	}
	
	return (<>
		{/* ----- APP HEADER -----*/}
		
		<AppHeader/>
		
		{/* ----- TWO MAIN BLOCKS -----*/}
		
		<main className={appStyles.burger_builder}>
			{state.error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (<>
				
				<BurgerIngredientsContext.Provider value={state.ingredientsData}>
					<BurgerIngredients/>
					{/*<BurgerIngredients ingredientsData={ingredientsData}/>*/}
				</BurgerIngredientsContext.Provider>
				
				<BurgerConstructor
					ingredientsData={randomData(ingredientsData, 7)}
					fixedData={ingredientsData}
				/>
			</>))}
		</main>
	</>)
}