import styles from "./Feed.module.scss"

import {initWebSocket, closeWebSocket} from "utils/ws.ts";

import {RootState} from "declarations/rootState.ts";
import {IConstructorSlice} from "declarations/sliceInterfaces";

import FeedItem from "common/FeedItem/FeedItem.tsx";

import {useEffect} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {wsMessage, wsOpen} from "services/orederFeed/actions.ts";

export default function Feed() {

    const dispatch = useDispatch();
    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);


    useEffect(() => {
        initWebSocket();

        dispatch(wsOpen);
        dispatch(wsMessage);
    }, [dispatch]);

    const orders = useSelector((state: RootState) => state.orderFeed);
    const message = useSelector((state: RootState) => state.orderFeed);

    const total = message.total;

    console.log(`Всего за сегодня: ${total}`);
    console.log(`Проверка: ${orders}`);

    return (
        <section className={styles.feed}>

            <div className={styles.container}>

                <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

                <div className={styles.feed_list}>
                    <>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
                        <FeedItem data={constructorData}/>
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
                        </div>
                    </>
                </div>
            </div>
        </section>
    );
}