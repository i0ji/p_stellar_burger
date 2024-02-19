// import {fetchIngredients} from 'services/slices/ingredientsSlice.ts';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//
// import AppStyles from './App.module.scss';
// import {IBurgerState} from "interfaces/sliceInterfaces";

import NotFound404 from "src/pages/NotFound404/NotFound404.tsx";
// import Loader from "components/common/Loader/Loader.tsx";
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerBuilder from "pages/BurgerBuilder/BurgerBuilder.tsx"
// import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
// import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
//
// import {useEffect} from "react";
// import {useDispatch, useSelector} from 'react-redux';


export default function App() {
	
	// const dispatch = useDispatch();
	//
	// const {ingredients: ingredientsData, status, error}: IBurgerState = useSelector((state: {
	// 	ingredients: IBurgerState
	// }) => state.ingredients);
	//
	//
	// useEffect(() => {
	// 	dispatch(fetchIngredients());
	// }, [dispatch]);
	//
	//
	// // --------------- STATUSES ---------------
	// if (status === 'loading') {
	// 	return <Loader/>;
	// }
	//
	// if (status === 'failed') {
	// 	return <p className={AppStyles.status}>Ошибка: {error}</p>;
	// }
	
	
	return (
		<BrowserRouter>
			<DndProvider backend={HTML5Backend}>
				<Routes>
					<AppHeader/>
					<Route path="/constructor" element={<BurgerBuilder/>}/>
					<Route path="/*" element={<NotFound404/>}/>
				</Routes>
			</DndProvider>
		</BrowserRouter>
	)
}