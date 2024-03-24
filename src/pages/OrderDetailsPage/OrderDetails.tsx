import styles from "./OrderDetails.module.scss"
import {useSelector} from "hooks/reduxHooks.ts";
import {RootState} from "declarations/rootState.ts";
import {useLocation, useParams} from "react-router-dom";

export default function OrderDetails() {

    const {id} = useParams<{ "id"?: string }>();

    const {ingredients: addedIngredients, bun} = useSelector((state: RootState) => state.constructorSlice)

    // --------------- SETTING BACKGROUND ---------------

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? styles.transparent : styles.dark;



    return (
        <div
            className={styles.order_details}
        >
            <div>
            <h5>#99999</h5>
            <h1>Death Star Starship Main бургер</h1>
            <p>выполнен</p>
            </div>
        </div>
    );
}