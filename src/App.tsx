import {useEffect, useState} from "react";
import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {getIngredients} from "src/utils/burger-api.ts";
import {IIngredient} from "src/Interfaces";

export default function App() {

    const [state, setState] = useState({
        ingredientsData: [], error: null
    });

    const {ingredientsData, error} = state;

    useEffect(() => {
        getIngredients()
            .then(data => setState(data))
            .catch(err => setState(err.message));
    }, []);

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