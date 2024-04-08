import styles from "./Feed.module.scss"

import {WS_URL} from "declarations/routs.ts";
import {updateCurrentOrder} from "slices/orderSlice.ts";

import {TOrder} from "declarations/types";

import {
    Loader,
    FeedItem
} from "components/index.ts";

import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {wsClose, wsConnect} from "services/orderFeed/actions.ts";

export default function Feed() {


    // --------------- VARS & STATES ---------------

    const dispatch = useDispatch();
    const renderCondition = useSelector(state => state.orderFeed.orders).orders.length !== 1;

    const WS_URL_ALL = `${WS_URL}/all`;


    // --------------- NAVIGATION ---------------

    const location = useLocation();


    // --------------- WS & ORDERS ---------------

    useEffect(() => {
        dispatch({
            type: wsConnect,
            payload: WS_URL_ALL
        });
        return (() => dispatch(wsClose()));
    }, [WS_URL_ALL, dispatch])


    // --------------- ORDERS ARRAY;
    const ordersList = useSelector(state => state.orderFeed.orders);

    // --------------- STATUS
    const status = useSelector(state => state.orderFeed.status);

    // --------------- ORDER DATA
    const ordersData = ordersList.orders;
    const totalToday = ordersList.totalToday;
    const total = ordersList.total;

    // --------------- READY ORDERS
    const ordersReady = ordersData.filter((order: TOrder) => order.status === 'done').slice(0, 5);

    // --------------- AWAIT ORDERS
    const ordersPending = ordersData.filter((order: TOrder) => order.status === 'pending').slice(0, 5);

    // --------------- ORDER DISPATCH
    const onUpgradeCurrentOrder = (order: TOrder) => {
        dispatch(updateCurrentOrder(order));
    }

    // --------------- LOADER ---------------

    if (status !== 'ONLINE' && renderCondition) {
        return <Loader description={'Проверяем заказы...'}/>
    }


    // --------------- CONSOLE ---------------

    //console.log(location.pathname);
    console.log('STATUS: ', status);
    // console.log(listValue);
    // console.log(ordersData[5].status);
    // console.log(ordersReady.slice(0,5));
    // console.log(`ORDERS DATA: ${ordersData}`);
    // console.log(`${ordersData}`)
    // console.log(ordersData)
    // console.log(`TOTAL TODAY: ${totalToday}`);
    // console.log(`TOTAL: ${total}`);


    // --------------- COMPONENT ---------------

    return (
        <section className={styles.feed}>

            <div className={styles.container}>

                <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

                <div className={styles.feed_list}>
                    <>

                        {!renderCondition && <Loader description={'Заказы загружаются!'}/>}

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