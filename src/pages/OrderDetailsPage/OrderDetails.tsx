import styles from "./OrderDetails.module.scss"

import {RootState} from "declarations/rootState.ts";
import {IIngredient} from "declarations/interfaces";
import {TOrder} from "declarations/types";

import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";

import {useSelector} from "hooks/reduxHooks.ts";
import {useLocation} from "react-router-dom";

export default function OrderDetails() {


    // --------------- NAVIGATION & BACKGROUND ---------------

    // const {number} = useParams<{ 'number'?: string }>(); - do not work !? where is a mistake?

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? `` : styles.modal_background;

    const number = location.pathname.replace('/feed/', '');

    // --------------- ORDERS DATA ---------------

    const order = useSelector((state: RootState) => state.orderFeed).orders.orders;
    const ingredientsData = useSelector((state: RootState) => state.ingredients.ingredients);

    const currentOrder = order.find((elem: TOrder) => elem.number?.toString() === number);
    const orderIngredientIDs = currentOrder?.ingredients;
    const orderIngredients = ingredientsData.filter(elem => orderIngredientIDs?.includes(elem._id));

    const orderStatus = (currentOrder?.status === 'done') ? 'Выполнен' : 'Готовится';
    const OrderDate = () => {
        const dateFromServer = currentOrder?.createdAt;
        return <FormattedDate date={new Date(dateFromServer)}/>
    }
    const orderBun = orderIngredients.find(elem => elem.type === 'bun');
    const calculateTotalAmount = (orderIngredients: IIngredient[], buns: IIngredient | undefined): number => {
        const ingredientsTotal = orderIngredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0);
        const bunTotal = buns?.price || 0;
        return ingredientsTotal + bunTotal;
    };

    const orderPrice = calculateTotalAmount(orderIngredients, orderBun);


    // --------------- CONSOLE ---------------
    // console.log('pathname:', location.pathname);
    // console.log('number:', location.pathname.replace('/feed/',''));
    // console.log('location:', location);
    console.log('order: ', number);
    console.log('currentOrder:', currentOrder);
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
        <>
            {currentOrder && ingredientsData.length && orderIngredientIDs &&
                <div
                    className={`${styles.order_details} ${modalBackground}`}
                >

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
                </div>
            }
        </>
    )
}
