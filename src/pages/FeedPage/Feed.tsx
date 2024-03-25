import styles from "./Feed.module.scss"

import {useSelector} from "hooks/reduxHooks.ts";

import {RootState} from "declarations/rootState.ts";
import {IConstructorSlice} from "declarations/sliceInterfaces";

import FeedItem from "common/FeedItem/FeedItem.tsx";


export default function Feed() {

    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);

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