import styles from "./OrderDetails.module.scss"

import {IIngredientsWithQuantity} from "declarations/interfaces";

import {updateCurrentOrder} from "slices/orderSlice.ts";
import {motion, AnimatePresence} from "framer-motion";
import {getConcreteOrder} from "utils/api.ts";

import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {Loader, Thumbnail} from "components/index.ts";

import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";


import {calculateTotalPrice, getIngredientsWithQuantity} from "utils/currentOrderCalculation.ts";


export default function OrderDetails({isVisible}:{isVisible:boolean}) {


    // --------------- VARS & STATES ---------------

    const dispatch = useDispatch();


    // --------------- NAVIGATION & BACKGROUND ---------------


    const currentOrder = useSelector(state => state.orderSlice.currentOrder);


    // --------------- NAVIGATION & BACKGROUND ---------------

    const {number} = useParams<{ "number"?: string }>();

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? `` : styles.modal_background;


    // --------------- GET ORDER ---------------

    useEffect(() => {
        if (currentOrder.number == null) {
            const fetchOrder = async () => {
                try {
                    const fetchedOrder = await getConcreteOrder(`${number}`);
                    dispatch(updateCurrentOrder(fetchedOrder.orders[0]))
                } catch (error) {
                    console.error('Произошла ошибка при загрузке заказа:', error);
                }
            };

            fetchOrder();
        }
    },);


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


    // --------------- STATUSES & CONDITIONS

    if (!orderIngredientIDs) {
        return (
            <Loader description={'Ждём заказ...'}/>
        )
    }


    // --------------- INGREDIENT QTY & PRICE CALCULATION ---------------

    const ingredientsWithQuantity = getIngredientsWithQuantity(orderIngredientIDs, ingredientsData);

    const totalOrderPrice = calculateTotalPrice(ingredientsWithQuantity);

    // --------------- INGREDIENT INFO ---------------

    const IngredientInfo = ({elem}: { elem: IIngredientsWithQuantity }) => {
        return (
            <div className={styles.order_ingredient}>
                <Thumbnail
                    image={elem.ingredient.image}
                    isLast={false}
                    count={null}
                />

                <p className="text text_type_main-default">
                    {elem.ingredient.name}
                </p>

                <div className={styles.order_ingredient_price}>
                    <p className="text text_type_digits-default">
                        <span className="text text_type_digits-default">{elem.qty} X &nbsp;</span>
                        {elem.ingredient.price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        )
    }


    // --------------- CONSOLE ---------------

    // console.log(orderIngredients.length)
    // console.log('QTY', ingredientsWithQuantity);
    // console.log('ALL INGREDIENTS: ',ingredientsData);
    // console.log('ORDER IDS: ',orderIngredientIDs);
    // console.log('KEY: ', location.key);
    // console.log('PATHNAME: ', location.pathname);
    // console.log('IS DIRECT:', isDirect);
    // console.log('WEBSOCKET ORDER:', wsOrder) ;
    // console.log('DIRECT ORDER:', directOrder);
    // console.log('currentOrder:', currentOrder);
    // console.log('pathname:', location.pathname);
    // console.log('number:', location.pathname.replace('/feed/',''));
    // console.log('location:', location);
    // console.log('WS STATUS: ', status);
    // console.log('number: ', number);
    // console.log('order:', order);
    // console.log(ingredientsWithQuantity);


    // --------------- COMPONENT ---------------

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="modal"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
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
                                            ingredientsWithQuantity.map((elem: IIngredientsWithQuantity, i: number) =>
                                                <li key={i}>
                                                    <IngredientInfo
                                                        elem={elem}
                                                    />
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>

                                <div
                                    className={styles.order_details_footer}
                                    style={{
                                        paddingRight: `${orderIngredients.length > 3 ? '5.5%' : '3%'}`
                                    }}
                                >
                                    <OrderDate/>
                                    <span className="text text_type_digits-default">
                            {totalOrderPrice}
                                        <CurrencyIcon type="primary"/>
                        </span>
                                </div>
                            </>
                        }
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}