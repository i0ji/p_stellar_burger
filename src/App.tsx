import {useEffect, useState} from "react";
import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {getIngredients} from "utils/burger-api.ts";
import {IIngredient} from "src/Interfaces";
import {IngredientsContext} from "services/ingredientsContext.ts";
import {BurgerConstructorContext} from "services/constructorContext.ts";

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
	
	
	{ /* ----- BUN ARRAY  ----- */
	}
	const bunData: IIngredient[] = ingredientsData.sort(function (a: IIngredient, b: IIngredient) {
		const aType = a.type ?? '';
		const bType = b.type ?? '';
		if (aType < bType) {
			return -1;
		}
		if (aType > bType) {
			return 1;
		}
		return 0;
	}).slice(0, 2);
	
	{ /* ----- ARRAY RANDOMIZER ----- */
	}
	
	function randomData(data: IIngredient[], qty: number) {
		const innerIngredients = data.filter(elem => elem.type !== 'bun');
		
		const randomData = [...innerIngredients].sort(() => .5 - Math.random());
		
		return randomData.slice(0, qty);
	}
	
	const contextData = randomData(ingredientsData, 7);
	
	return (
		<>
			{/* ----- APP HEADER -----*/}
			
			<AppHeader/>
			
			{/* ----- TWO MAIN BLOCKS -----*/}
			
			<main className={appStyles.burger_builder}>
				{state.error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (
					<>
						<IngredientsContext.Provider value={state.ingredientsData}>
							<BurgerIngredients/>
							{/*<BurgerIngredients ingredientsData={ingredientsData}/>*/}
						</IngredientsContext.Provider>
						
						<BurgerConstructorContext.Provider value={{contextData, bunData}}>
							<BurgerConstructor/>
						</BurgerConstructorContext.Provider>
					</>
				))}
			</main>
		</>
	)
}