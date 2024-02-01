import {useEffect, useState} from "react";
import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {getIngredients} from "src/utils/burger-api.ts";
import {IIngredient} from "src/Interfaces";

export default function App() {

    // const [ingredientsData, setIngredientsData] = useState([]);
    // const [error, setError] = useState(null);

    const [state, setState] = useState({
        ingredientsData: [],
        error: null
    });

    const {ingredientsData, error} = state;

    useEffect(() => {
        getIngredients()
            .then(data => setState(prevState => ({...prevState, ingredientsData: data})))
            .catch(err => {
                setState(prevState => ({...prevState, error: err.message}));
                console.error(err);
            });
    }, []);

    function randomData(data: IIngredient[], qty: number) {
        const innerIngredients = data.filter(elem => elem.type !== 'bun')

        const randomData = [...innerIngredients].sort(() => .5 - Math.random())

        return randomData.slice(0, qty)
    }

    return (
        <>
            {/* ----- APP HEADER -----*/}

            <AppHeader/>

            {/* ----- TWO MAIN BLOCKS -----*/}

            <main className={appStyles.burger_builder}>
                {
                    state.error ? (
                        <p>Произошла ошибка: {error}</p>
                    ) : (
                        ingredientsData.length > 0 && (
                            <>
                                <BurgerIngredients ingredientsData={ingredientsData}/>
                                <BurgerConstructor
                                    ingredientsData={randomData(ingredientsData, 7)}
                                    fixedData={ingredientsData}
                                />
                            </>
                        )
                    )
                }
            </main>
        </>
    )
}