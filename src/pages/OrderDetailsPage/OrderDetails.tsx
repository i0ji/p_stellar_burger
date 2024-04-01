import styles from "./OrderDetails.module.scss"

import {IIngredient} from "declarations/interfaces";

import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";

import {useSelector} from "hooks/reduxHooks.ts";
import {useLocation} from "react-router-dom";

export default function OrderDetails() {

    // --------------- NAVIGATION & BACKGROUND ---------------


    const location = useLocation();

    const modalBackground = (location.key === 'default') ? `` : styles.modal_background;

    // --------------- ORDERS DATA ---------------

    const currentOrder = useSelector(state => state.orderSlice.currentOrder)
    const ingredientsData = useSelector(state => state.ingredients.ingredients);
    const orderIngredientIDs = currentOrder?.ingredients;
    const orderIngredients = ingredientsData.filter(elem => orderIngredientIDs?.includes(elem._id!));


    const orderStatus = (currentOrder?.status === 'done') ? 'Выполнен' : 'Готовится';

    const orderDate = currentOrder.createdAt;
    const OrderDate = () => {
        const dateFromServer = `${orderDate}`
        return <FormattedDate date={new Date(dateFromServer)}/>
    }

    const orderBun = orderIngredients.find(elem => elem.type === 'bun');
    const calculateTotalAmount = (orderIngredients: IIngredient[], buns: IIngredient | undefined): number => {
        const ingredientsPrice = orderIngredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0);
        const bunPrice = buns?.price || 0;
        return ingredientsPrice + bunPrice;
    };
    const orderPrice = calculateTotalAmount(orderIngredients, orderBun);

    // --------------- CONSOLE ---------------

    // console.log('pathname:', location.pathname);
    // console.log('number:', location.pathname.replace('/feed/',''));
    // console.log('location:', location);
    // console.log('WS STATUS: ', status);
    // console.log('number: ', number)
    // console.log('order:', order);
    // console.log('currentOrder:', currentOrder);


    // --------------- INGREDIENT STRIPE ---------------

    const IngredientInfo = ({elem}: { elem: IIngredient }) => {
        return (
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
                    <CurrencyIcon type="primary"/>
                    <p className="text text_type_digits-default">
                        {elem.price}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.order_details} ${modalBackground}`}>
            {currentOrder &&
                <>
                    <div className={styles.order_details_header}>
                        <h5 className="text text_type_digits-default mb-10 ">{currentOrder.number}</h5>
                        <h3 className="text text_type_main-medium mb-3">{currentOrder.name}</h3>
                        <p className="text text_type_main-default mb-15">{orderStatus}</p>
                    </div>

                    <h3 className="text text_type_main-medium mb-3">Состав:</h3>

                    <div className={`mb-10 ${styles.order_details_list}`}>
                        <ul>
                            {
                                orderIngredients.map((elem: IIngredient, i: number) =>
                                    <li key={i}>
                                        <IngredientInfo
                                            elem={elem}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className={styles.order_details_footer}>
                        <OrderDate/>
                        <span className="text text_type_digits-default">
                            <CurrencyIcon type="primary"/>
                            {orderPrice}
                        </span>
                    </div>
                </>
            }
        </div>
    )
}