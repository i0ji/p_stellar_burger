import styles from "./Feed.module.scss"


export default function Feed() {


    // --------------- VARS/STATES ---------------


    return (
        <section className={styles.feed}>

            <div className={styles.container}>

                <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

                <div className={styles.feed_list}>
                    <>
                        {/*{orders &&*/}
                        {/*    ordersData.map((order: TOrder, i: number) =>*/}
                        {/*        <Link*/}
                        {/*            key={i}*/}
                        {/*            to={`${order.number}`}*/}
                        {/*            state={{background: location}}*/}
                        {/*        >*/}
                        {/*            <FeedItem order={order}/>*/}
                        {/*        </Link>*/}
                        {/*    )*/}
                        {/*}*/}
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
                                {/*<p className="text text_type_main-default">Выполнено за всё время:</p>*/}
                                {/*<h1 className="text text_type_digits-large">{total}</h1>*/}

                                {/*<p className="text text_type_main-default">Выполнено за сегодня:</p>*/}
                                {/*<h1 className="text text_type_digits-large">{totalToday}</h1>*/}
                            </div>
                        </div>
                    </>
                </div>

            </div>
        </section>
    );
}