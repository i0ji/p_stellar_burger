import styles from "./OrderDetails.module.scss"

import {RootState} from "declarations/rootState.ts";
import {IIngredient} from "declarations/interfaces";
import {IConstructorSlice} from "declarations/sliceInterfaces";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";

import {useSelector} from "hooks/reduxHooks.ts";
import {useParams, useLocation} from "react-router-dom";

export default function OrderDetails() {

    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);

    // --------------- ROUTING & BACKGROUND ---------------

    const {number} = useParams<{ "number"?: string }>();
    const location = useLocation();

    const modalBackground = (location.key === 'default') ? styles.transparent : styles.dark;


    // --------------- INGREDIENT STRIPE
    const OrderIngredientThumbnails = ({elem, isBun}: { elem: IIngredient, isBun: boolean }) => {
        return (
            <>
                {
                    constructorData.addedIngredients.length ?
                        <div className={styles.order_ingredient}>
                            <Thumbnail
                                image={elem.image}
                                count={null}
                                isLast={false}
                            />

                            <p className="text text_type_main-default">
                                {elem.name}
                            </p>

                            <div className={styles.order_ingredient_price}>
                                <p className="text text_type_digits-default">
                                    {isBun ? '2' : 'wait'} X {elem.price}
                                </p>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div> : <p>no!</p>
                }
            </>
        )
    }

    return (
        <div
            //            className={styles.order_details}
            className={`${styles.order_details} ${modalBackground}`}
        >
            <div className={styles.order_details_header}>
                <h5 className="text text_type_digits-default mb-10 ">{number}</h5>
                <h3 className="text text_type_main-medium mb-3">Death Star Starship Main бургер</h3>
                <p className="text text_type_main-default mb-15">Выполнен</p>
            </div>

            <h3 className="text text_type_main-medium mb-3">Состав:</h3>

            <div className="mb-10">
                <ul>
                    {constructorData.addedIngredients ?
                        constructorData.addedIngredients.map((elem: IIngredient, i: number) =>
                            <li key={i}>
                                <OrderIngredientThumbnails
                                    isBun={false}
                                    elem={elem}
                                />
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