import styles from "./OrderDetails.module.scss"

import {useSelector} from "hooks/reduxHooks.ts";
import {useLocation, useParams} from "react-router-dom";

import {RootState} from "declarations/rootState.ts";
import {IIngredient} from "declarations/interfaces";
import {IConstructorSlice} from "declarations/sliceInterfaces";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails() {

    //  const {id} = useParams<{ "id"?: string }>();

    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);

    // --------------- SETTING BACKGROUND ---------------

    const location = useLocation();

    //const modalBackground = (location.key === 'default') ? styles.transparent : styles.dark;


    // --------------- SETTING BACKGROUND ---------------

    const OrderIngredient = ({elem, isBun}: { elem: IIngredient, isBun: boolean }) => {
        return (
            <>
                {constructorData.addedIngredients.length ?
                    <div className={styles.order_ingredient}>
                        <div className={styles.gradient_wrapper}>
                            <div className={styles.gradient_wrapper_background}>
                                <img src={elem.image} alt=""/>
                            </div>
                        </div>

                        <p className="text text_type_main-default">
                            {elem.name}
                        </p>

                        <div className={styles.order_ingredient_price}>
                            <p className="text text_type_digits-default">
                                {isBun ? '2' : 'wait'} X {elem.price}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                    : <p>no!</p>}
            </>
        )
    }

    return (
        <div
            className={styles.order_details}
        >
            <div className={styles.order_details_header}>
                <h5 className="text text_type_digits-default mb-10 ">#99999</h5>
                <h3 className="text text_type_main-medium mb-3">Death Star Starship Main бургер</h3>
                <p className="text text_type_main-default mb-15">Выполнен</p>
            </div>

            <h3 className="text text_type_main-medium mb-3">Состав:</h3>

            <div className="mb-10">
                <ul>
                    <li>
                        <OrderIngredient
                            elem={constructorData.bun}
                            isBun={true}
                        />
                    </li>
                    {constructorData.addedIngredients ?
                        constructorData.addedIngredients.map((elem: IIngredient, i: number) =>
                            <li
                                key={i}
                            >
                                <OrderIngredient isBun={false} elem={elem}/>
                            </li>
                        ) : 'hello'
                    }
                </ul>
            </div>

            <div className={styles.order_details_footer}>
                <p>Вчера, 13:50</p>
                <span className="text text_type_digits-default">
                    {constructorData.totalAmount}
                    <CurrencyIcon type="primary"/>
                </span>
            </div>

        </div>
    );
}