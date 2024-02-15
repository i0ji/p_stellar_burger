import {fetchIngredients} from 'services/slices/ingredientsSlice.ts';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import AppStyles from './App.module.scss';
import {IBurgerState} from "interfaces/sliceInterfaces";

import Loader from "components/common/Loader/Loader.tsx";
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";

import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

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
        return <Loader/>;
    }

    if (status === 'failed') {
        return <p className={AppStyles.status}>Ошибка: {error}</p>;
    }


    return (
        <DndProvider backend={HTML5Backend}>
            {/* --------------- APP HEADER --------------- */}

            <AppHeader/>

            {/* --------------- MAIN BLOCKS --------------- */}

            <main className={AppStyles.burger_builder}>
                {error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (
                    <>
                        <BurgerIngredients/>

                        <BurgerConstructor/>
                    </>
                ))}

            </main>


        </DndProvider>
    )
}