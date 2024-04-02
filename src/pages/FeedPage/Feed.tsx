import styles from "./Feed.module.scss"

import {Link, useLocation} from "react-router-dom";
import {WS_URL} from "declarations/routs.ts";
import {updateCurrentOrder} from "slices/orderSlice.ts";

import {TOrder} from "declarations/types";

import FeedItem from "common/FeedItem/FeedItem.tsx";
import Loader from "common/Loader/Loader.tsx";

import {useEffect} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {wsClose, wsConnect} from "services/orderFeed/actions.ts";

export default function Feed() {


    // --------------- VARS/STATES ---------------

    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch({
            type: wsConnect,
            payload: `${WS_URL}/all`
        });
        return (() => dispatch(wsClose()));
    }, [dispatch])
    // --------------- ORDERS ARRAY;
    const ordersList = useSelector(state => state.orderFeed.orders);
    // --------------- STATUS
    const status = useSelector(state => state.orderFeed.status);
    // --------------- LOADER CONDITION
    const renderCondition = useSelector(state => state.orderFeed.orders).orders.length !== 1;

    const ordersData = ordersList.orders;
    const totalToday = ordersList.totalToday;
    const total = ordersList.total;

    // --------------- READY ORDERS
    const ordersReady = ordersData.filter((order: TOrder) => order.status === 'done').slice(0, 5);
    // --------------- AWAIT ORDERS
    const ordersPending = ordersData.filter((order: TOrder) => order.status === 'pending').slice(0, 5);


    // --------------- CONSOLE ---------------
    //console.log(location.pathname);
    // console.log(listValue);
    // console.log(ordersData[5].status);
    // console.log(ordersReady.slice(0,5));
    // console.log(`ORDERS DATA: ${ordersData}`);
    // console.log(`${ordersData}`)
    // console.log(ordersData)
    // console.log(`TOTAL TODAY: ${totalToday}`);
    // console.log(`TOTAL: ${total}`);

    const onUpgradeCurrentOrder = (order: TOrder) => {
        dispatch(updateCurrentOrder(order));
    }

    // --------------- LOADER ---------------

    if (status !== 'ONLINE' && renderCondition) {
        return <Loader/>
    }

    return (
        <section className={styles.feed}>

            <div className={styles.container}>

                <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

                <div className={styles.feed_list}>
                    <>
                        {
                            ordersList && ordersData.map((currentOrder: TOrder, i: number) =>
                                <Link
                                    key={i}
                                    to={`/feed/${currentOrder.number}`}
                                    state={{background: location}}
                                    onClick={() => onUpgradeCurrentOrder(currentOrder)}
                                >
                                    <FeedItem currentOrder={currentOrder}/>
                                </Link>
                            )
                        }
                    </>
                </div>

                <div className={`${styles.feed_details} pl-15`}>

                    <div className={`${styles.feed_details_order_status} mb-15`}>
                        <div className={styles.feed_details_ready}>
                            <h5>Готовы:</h5>
                            {ordersReady.map((elem: TOrder, i: number) =>
                                <p key={i}>{elem.number}</p>
                            )}
                        </div>
                        <div className={styles.feed_details_await}>
                            <h5
                            >Готовятся:</h5>
                            {ordersPending.map((elem: TOrder, i: number) =>
                                <p key={i}>{elem.number}</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.feed_details_total}>
                        <p className="text text_type_main-default">Выполнено за всё время:</p>
                        <h1 className="text text_type_digits-large mb-15">{total}</h1>

                        <p className="text text_type_main-default">Выполнено за сегодня:</p>
                        <h1 className="text text_type_digits-large">{totalToday}</h1>
                    </div>

                </div>

            </div>

        </section>
    );
}