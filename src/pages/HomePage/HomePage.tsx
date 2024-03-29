import styles from "./HomePageStyles.module.scss"

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";

import {IBurgerState} from "declarations/interfaces";
import {RootState} from "declarations/rootState.ts";

import Loader from "common/Loader/Loader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";

import {useSelector} from "hooks/reduxHooks.ts";

export default function HomePage() {

    const {ingredients: ingredientsData, burgerStatus, error}: IBurgerState = useSelector((state: {
        ingredients: IBurgerState
    }) => state.ingredients);

    const authStatus = useSelector((state: RootState) => state.authSlice.status);

    // --------------- STATUSES ---------------
    if (burgerStatus === 'loading') {
        return <Loader/>;
    }

    if (burgerStatus === 'failed') {
        return <p className={styles.status}>Ошибка: {error}</p>;
    }

    if (authStatus === 'loading') {
        return <Loader/>;
    }

    return (
        <main>
            {error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (
                <section className={styles.burger_builder}>
                    <DndProvider backend={HTML5Backend}>

                        <div className={styles.container}>
                            <BurgerIngredients/>

                            <BurgerConstructor/>
                        </div>
                    </DndProvider>
                </section>
            ))}
        </main>
    );
}