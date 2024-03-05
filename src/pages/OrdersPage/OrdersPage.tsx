import styles from "./OrdersPage.module.scss"


import {useSelector} from "react-redux";


export default function OrdersPage() {

    const addedIngredients = useSelector(state => state.constructorSlice.addedIngredients)

    return (
        <section className={styles.orders_list}>
            <div className={styles.container}>
                Здесь будут ваши заказы
                <div className={styles.orders_list_ingredients}></div>
                {addedIngredients.map(elem => {
                  return <p>{elem.name}</p>
                })}
            </div>
        </section>
    );
}