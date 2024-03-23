import styles from "./Feed.module.scss"
// import {useSelector} from "hooks/reduxHooks.ts";
// import {RootState} from "declarations/rootState.ts";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function Feed() {

    //const addedIngredients = useSelector((state: RootState) => state.constructorSlice.addedIngredients);


    const FeedItem = () => {
        return (
            <div className={styles.feed_item}>

                <div className={styles.feed_item_info}>
                    <p>#34536</p>
                    <p className={styles.order_date}>Сегодня, 16:20</p>
                </div>

                <div className={`${styles.feed_item_name} pt-6`}>
                    <h4>Death Star Starship Main бургер</h4>
                </div>

                <div className={styles.feed_item_ingredients}>

                    <div className={styles.ingredients_thumbnail}>
                        xxxxxxxxxxxxxx
                    </div>

                    <div className={styles.feed_item_price}>
                        <p>480</p>
                        <CurrencyIcon type={"primary"}/>
                    </div>

                </div>

            </div>
        )
    }

    return (
        <section className={styles.feed}>

            <h1 className={`${styles.feed_header} p-5 text text_type_main-large`}>Лента заказов</h1>

            <div className={styles.feed_list}>
                <FeedItem/>
                {/*<FeedItem/>*/}
                {/*<FeedItem/>*/}
                {/*<FeedItem/>*/}
                {/*<FeedItem/>*/}
            </div>

            <div className={styles.feed_details}>
                ddddddddddddddddddddddd
            </div>

        </section>
    );
}