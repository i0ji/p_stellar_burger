import styles from "./Feed.module.scss"
import {useSelector} from "hooks/reduxHooks.ts";
import {RootState} from "declarations/rootState.ts";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "declarations/interfaces";
import {IConstructorSlice} from "declarations/sliceInterfaces";

export default function Feed() {

    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);


    // --------------- FEED ITEM ---------------

    const FeedItem = () => {
        return (
            <>
                <div className={styles.feed_item}>

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
                                    <div className={styles.gradient_wrapper}>
                                        <div className={styles.gradient_wrapper_background}>
                                            <img src={constructorData.bun.image} alt=""/>
                                        </div>
                                    </div> : <p>HELLO</p>
                            }

                            {
                                constructorData.addedIngredients.map((elem: IIngredient, i: number) =>
                                    <>
                                        <div className={styles.gradient_wrapper} key={i}>
                                            <div className={styles.gradient_wrapper_background}>
                                                <img src={elem.image} alt=""/>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className={styles.feed_item_price}>
                            <p>{constructorData.totalAmount}</p>
                            <CurrencyIcon type={"primary"}/>
                        </div>

                    </div>

                </div>
            </>
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
                buy
            </div>

        </section>
    );
}