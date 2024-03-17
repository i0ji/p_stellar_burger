import styles from "./OrdersPage.module.scss"

import {useSelector} from "react-redux";
import {IIngredient} from "declarations/interfaces";
import {RootState} from "declarations/rootState.ts";


export default function OrdersPage() {

    const addedIngredients = useSelector((state: RootState) => state.constructorSlice.addedIngredients)

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.order_list}>
                    Здесь будут ваши заказы:
                </div>

                <div className={styles.orders_list_ingredients}>
                    {addedIngredients.map((elem: IIngredient, i) => {
                        return <p key={i}>{elem.name}</p>
                    })}
                </div>
            </div>
        </section>
    );
}