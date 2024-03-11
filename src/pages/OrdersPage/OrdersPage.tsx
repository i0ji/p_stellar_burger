import styles from "./OrdersPage.module.scss"

import {useSelector} from "react-redux";
import {IIngredient} from "declarations/interfaces";
import {RootState} from "declarations/rootState.ts";


export default function OrdersPage() {
	
	const addedIngredients = useSelector((state: RootState) => state.constructorSlice.addedIngredients)
	
	return (
		<section className={styles.orders_list}>
			<div className={styles.container}>
				Здесь будут ваши заказы
				<div className={styles.orders_list_ingredients}>
					{addedIngredients.map((elem: IIngredient) => {
						return <p>{elem.name}</p>
						
					})}
				</div>
			</div>
		</section>
	);
}