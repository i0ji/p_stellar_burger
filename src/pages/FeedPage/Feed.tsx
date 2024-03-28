import styles from "./Feed.module.scss"

import {WS_URL} from "declarations/routs.ts";

import {RootState} from "declarations/rootState.ts";

import FeedItem from "common/FeedItem/FeedItem.tsx";

import {useSelector, useDispatch} from "hooks/reduxHooks.ts";
import {useEffect} from 'react';
import {wsMessage, wsOpen} from "services/orederFeed/actions.ts";
import {TOrder} from "declarations/types";

export default function Feed() {

    const dispatch = useDispatch();

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            console.log('WebSocket подключение установлено');
            dispatch(wsOpen())
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch(wsMessage(data));
        };
    }, [dispatch]);

    const ordersData = useSelector((state: RootState) => state.orderFeed.orders).orders;
    const total = useSelector((state: RootState) => state.orderFeed.orders).total;
    const totalToday = useSelector((state: RootState) => state.orderFeed.orders).totalToday;

    return (
        <section className={styles.feed}>

            <div className={styles.container}>

                <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

                <div className={styles.feed_list}>
                    <>
                        {
                            ordersData.map((order: TOrder, i: number) =>
                                <div key={i}>
                                    <FeedItem order={order}/>
                                </div>
                            )
                        }
                    </>
                </div>

                <div className={styles.feed_details}>
                    <>
                        <div className={styles.feed_details_info}>
                            <div className={styles.feed_details_ready}>
                                <h5>Готовы:</h5>
                                <p>2312123123312</p>
                                <p>12312</p>
                                <p>213</p>
                                <p>123123</p>
                            </div>
                            <div className={styles.feed_details_await}>
                                <h5>Готовы:</h5>

                                <p>2312123123312</p>
                                <p>12312</p>
                                <p>213</p>
                                <p>123123</p>
                            </div>
                            <div className={styles.feed_details_total}>
                                <p className="text text_type_main-default">Выполнено за всё время:</p>
                                <h1 className="text text_type_digits-large">{total}</h1>

                                <p className="text text_type_main-default">Выполнено за сегодня:</p>
                                <h1 className="text text_type_digits-large">{totalToday}</h1>
                            </div>
                        </div>
                    </>
                </div>

            </div>
        </section>
    );
}