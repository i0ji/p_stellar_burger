import {useEffect, useState} from "react";
import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {getIngredients} from "src/utils/burger-api.ts";

function App() {

    const [ingredientsData, setIngredientsData] = useState([]);
    const [error,setError] = useState(null)

    useEffect(() => {
        getIngredients()
            .then(data => setIngredientsData(data))
            .catch(err => setError(err.message));
    }, []);


    return (
        <>
            {/* ----- APP HEADER -----*/}

            <AppHeader/>

            {/* ----- TWO MAIN BLOCKS -----*/}

            <main
                className={appStyles.burger_builder}
            >
                {
                    ingredientsData.length &&
                    <>

                        <BurgerIngredients ingredientsData={ingredientsData}/>

                        <BurgerConstructor ingredientsData={ingredientsData}/>

                    </>
                }
            </main>
        </>
    )
}

export default App;