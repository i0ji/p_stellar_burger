import styles from "./OrderDetails.module.scss"

import {IIngredient} from "declarations/interfaces";

import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";

import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getConcreteOrder} from "utils/api.ts";

export default function OrderDetails({isDirect}: { isDirect: boolean }) {


    // --------------- NAVIGATION & BACKGROUND ---------------

    const {number} = useParams<{ "number"?: string }>();

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? `` : styles.modal_background;


    // --------------- GET ORDER ---------------

    const dispatch = useDispatch();

    const [directOrder, setDirectOrder] = useState();

    if (isDirect) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const fetchedOrder = await getConcreteOrder(`${number}`);
                    setDirectOrder(fetchedOrder.orders[0])
                } catch (error) {
                    console.error('Произошла ошибка при загрузке заказа:', error);
                }
            };

            fetchData();

        }, [dispatch, number]);
    }

    const wsOrder = useSelector(state => state.orderSlice.currentOrder);

    const currentOrder = isDirect ? directOrder : wsOrder;


    // --------------- ORDER DATA ---------------

    const ingredientsData = useSelector(state => state.ingredients.ingredients);
    const orderIngredientIDs = currentOrder?.ingredients;
    const orderIngredients = ingredientsData.filter(elem => orderIngredientIDs?.includes(elem._id!));
    // --------------- ORDER STATUS
    const orderStatus = (currentOrder?.status === 'done') ? 'Выполнен' : 'Готовится';
    // --------------- ORDER DATE
    const orderDate = currentOrder?.createdAt;
    const OrderDate = () => {
        const dateFromServer = `${orderDate}`;
        return <FormattedDate date={new Date(dateFromServer)}/>
    }
    // --------------- AMOUNT CALCULATE
    const orderBun = orderIngredients.find(elem => elem.type === 'bun');
    const calculateTotalAmount = (orderIngredients: IIngredient[], buns: IIngredient | undefined): number => {
        const ingredientsPrice = orderIngredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0);
        const bunPrice = buns?.price || 0;
        return ingredientsPrice + bunPrice;
    };
    const orderPrice = calculateTotalAmount(orderIngredients, orderBun);


    // --------------- CONSOLE ---------------

    console.log(orderIngredients.length)
    // console.log('isDirect: ', isDirect);
    // console.log('currentOrder:', currentOrder);
    // console.log('pathname:', location.pathname);
    // console.log('number:', location.pathname.replace('/feed/',''));
    // console.log('location:', location);
    // console.log('WS STATUS: ', status);
    // console.log('number: ', number);
    // console.log('order:', order);


    // --------------- SCROLL BEHAVIOR ---------------

    // const scrollbarVisibility = (currentOrder.ingredients.length <= 3) ? 'scrollBehavior: none' : '';

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

                    <div
                        className={`mb-10 ${styles.order_details_list}`}
                        style={{
                            scrollbarWidth: `${orderIngredients.length > 3 ? 'auto' : 'none'}`,
                            overflowY: `${orderIngredients.length > 3 ? 'auto' : 'hidden'}`,
                    }}
                    >
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