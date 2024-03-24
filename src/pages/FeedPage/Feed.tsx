import styles from "./Feed.module.scss"

import {useNavigate} from "react-router-dom";
import {useSelector} from "hooks/reduxHooks.ts";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {RootState} from "declarations/rootState.ts";
import {IIngredient} from "declarations/interfaces";
import {IConstructorSlice} from "declarations/sliceInterfaces";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";

export default function Feed() {

    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);

    const navigate = useNavigate();
    // --------------- FEED ITEM ---------------

    const FeedItem = () => {
        return (
            <div
                className={styles.feed_item}
                onClick={() => navigate('/feed/number')}
            >

                <div className={styles.feed_item_info}>
                    <p>#99999</p>
                    <p className={styles.order_date}>Сегодня, 16:20</p>
                </div>

                <div className={`${styles.feed_item_name} pt-6`}>
                    <h4>Death Star Starship Main бургер</h4>
                </div>

                <div className={`${styles.feed_item_ingredients} pt-6 pb-6`}>

                    <div className={styles.ingredients_thumbnail}>

                        {
                            constructorData.bun ?
                                <Thumbnail elem={constructorData.bun}/>
                                : <p>HELLO</p>
                        }

                        {
                            constructorData.addedIngredients.map(
                                (elem: IIngredient, i: number) =>

                                        <Thumbnail elem={elem} key={i}/>

                            )
                        }
                    </div>

                    <div className={styles.feed_item_price}>
                        <p className="text text_type_digits-default">
                            {constructorData.totalAmount}
                        </p>
                        <CurrencyIcon type={"primary"}/>
                    </div>

                </div>

            </div>
        )
    }

    return (
        <section className={styles.feed}>

            <h1 className={`${styles.feed_header} text text_type_main-large mt-10 pb-10`}>Лента заказов</h1>

            <div className={styles.feed_list}>
                <FeedItem/>
                {/*<FeedItem/>*/}
                {/*<FeedItem/>*/}
                {/*<FeedItem/>*/}
                {/*<FeedItem/>*/}
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

        </section>
    );
}