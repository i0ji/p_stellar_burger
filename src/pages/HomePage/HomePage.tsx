import styles from "./HomePageStyles.module.scss"
import {IBurgerState} from "interfaces/sliceInterfaces";

import Loader from "components/common/Loader/Loader.tsx";
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor.tsx";

import {useSelector} from "react-redux";

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";

export default function HomePage() {

    const {ingredients: ingredientsData, status, error}: IBurgerState = useSelector((state: {
        ingredients: IBurgerState
    }) => state.ingredients);


    // --------------- STATUSES ---------------
    if (status === 'loading') {
        return <Loader/>;
    }

    if (status === 'failed') {
        return <p className={styles.status}>Ошибка: {error}</p>;
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