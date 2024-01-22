import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngridients";
import ingredients_data from "data/ingredients_data.json"


function App() {
    return (
        <>
            <AppHeader/>

            <main className={appStyles.burger_builder}>

                <BurgerConstructor ingredients_data={ingredients_data}/>

                <BurgerIngredients ingredients_data={ingredients_data}/>

            </main>
        </>
    )
}

export default App
