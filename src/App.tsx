import appStyles from './App.module.scss';
import AppHeader from "components/AppHeader/AppHeader.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngridients";

function App() {
    return (
        <>
            <AppHeader/>

            <main className={appStyles.burger_builder}>

                <BurgerConstructor/>

                <BurgerIngredients/>

            </main>
        </>
    )
}

export default App
