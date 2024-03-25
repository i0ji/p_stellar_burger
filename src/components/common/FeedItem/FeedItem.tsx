import styles from "./FeedItem.module.scss"

import {IIngredient} from "declarations/interfaces";
import {IConstructorSlice} from "declarations/sliceInterfaces";

import Thumbnail from "common/Thumbnail/Thumbnail.tsx";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useNavigate} from "react-router-dom";

export default function FeedItem({data}: { data: IConstructorSlice }) {

    const navigate = useNavigate();

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
                        data.bun ?
                            <div
                                style={{zIndex: 200}}
                                id={styles.wrapper}>
                                <Thumbnail elem={data.bun}/>
                            </div
                            >
                            : <p>HELLO</p>
                    }

                    {
                        data.addedIngredients.map(
                            (elem: IIngredient, i: number) =>
                                <div
                                    key={i}
                                    style={{zIndex: 100 - i}}
                                >
                                    <Thumbnail elem={elem}/>
                                </div>
                        )
                    }
                </div>

                <div className={styles.feed_item_price}>
                    <p className="text text_type_digits-default">
                        {data.totalAmount}
                    </p>
                    <CurrencyIcon type={"primary"}/>
                </div>

            </div>

        </div>
    )
}
