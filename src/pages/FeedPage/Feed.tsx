import styles from "./Feed.module.scss"

import {Link, useLocation} from "react-router-dom";
import {WS_URL} from "declarations/routs.ts";

import {TOrder} from "declarations/types";
import {RootState} from "declarations/rootState.ts";

import FeedItem from "common/FeedItem/FeedItem.tsx";

import {useEffect} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {wsConnect} from "services/orderFeed/actions.ts";

export default function Feed() {


    // --------------- VARS/STATES ---------------

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch({
            type: wsConnect,
            payload: `${WS_URL}/all`
        });
    }, [dispatch])


    // --------------- ORDERS DATA ---------------

    const ordersList = useSelector((state: RootState) => state.orderFeed.orders);

    const ordersData = ordersList.orders;
    const totalToday = ordersList.totalToday;
    const total = ordersList.total;

    // --------------- READY ORDERS
    const ordersReady = ordersData.filter((order: TOrder) => order.status === 'done').slice(0, 5);
    // --------------- AWAIT ORDERS
    const ordersPending = ordersData.filter((order: TOrder) => order.status === 'pending').slice(0, 5);


    // --------------- CONSOLE ---------------
    // console.log(ordersData[5].status);
    // console.log(ordersReady.slice(0,5));
    // console.log(`ORDERS DATA: ${ordersData}`);
    // console.log(`${ordersData}`)
    // console.log(ordersData)
    // console.log(`TOTAL TODAY: ${totalToday}`);
    // console.log(`TOTAL: ${total}`);

    return (
        <section className={styles.feed}>

            <div className={styles.container}>

                <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

                <div className={styles.feed_list}>
                    <>
                        {ordersList && ordersData.length > 0 &&
                            ordersData.map((currentOrder: TOrder, i: number) =>
                                <Link
                                    key={i}
                                    to={`${currentOrder.number}`}
                                    state={{background: location}}
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