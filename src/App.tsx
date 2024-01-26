import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";
import {useEffect, useState} from "react";
import OrderDetails from "components/Modal/OrderDetails/OrderDetails.tsx";
import IngredientDetails from "components/Modal/IngredientDetails/IngredientDetails.tsx"


const ingredientsDataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

    const [ingredientsData, setIngredientsData] = useState([])

    {/* ----- FETCHING DATA ON MOUNT -----*/}

    useEffect(() => {
        fetch(ingredientsDataUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        `NO BURGERS! CUZ OF: ${res.status} ARGHHHHHH!`
                    );
                }
                return res.json();
            })
            .then(data => {
                setIngredientsData(data.data)
            })
            .catch((err) => console.log(err.message))
    }, []);

    return (
        <>
            <AppHeader/>

            <main className={appStyles.burger_builder}>

                {
                    ingredientsData.length && <>

                        <BurgerIngredients ingredientsData={ingredientsData}/>

                        <BurgerConstructor ingredientsData={ingredientsData}/>
                    </>
                }
            </main>

            <div style={{height: 500,
            background: "white"}}></div>

            <OrderDetails/>

            <IngredientDetails/>
        </>
    )
}

export default App
