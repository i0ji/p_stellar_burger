import styles from "./FeedItem.module.scss"

import Thumbnail from "common/Thumbnail/Thumbnail.tsx";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useNavigate} from "react-router-dom";
import {TOrder} from "declarations/types";
import {useSelector} from "hooks/reduxHooks.ts";
import {RootState} from "declarations/rootState.ts";

export default function FeedItem({data}: { data: TOrder }) {

    const navigate = useNavigate();




    return (
        <div
            className={styles.feed_item}
            onClick={() => navigate('/feed/number')}
        >

            <div className={styles.feed_item_info}>
                <p>{data.number}</p>
                <p className={styles.order_date}>{data.createdAt}</p>
            </div>

            <div className={`${styles.feed_item_name} pt-6`}>
                <h4>{data.name}</h4>
            </div>

            <div className={`${styles.feed_item_ingredients} pt-6 pb-6`}>

                <div className={styles.ingredients_thumbnail}>

                    {
                        data.ingredients[0] ?
                            <div
                                style={{zIndex: 200}}
                                id={styles.wrapper}>
                                <Thumbnail elemID={'xxx'}/>
                            </div
                            >
                            : <p>HELLO</p>
                    }

                    {
                        data.ingredients.map(
                            (elem, i: number) =>
                                <div
                                    key={i}
                                    style={{zIndex: 100 - i}}
                                >
                                    <Thumbnail elemID={'x'}/>
                                </div>
                        )
                    }
                </div>

                <div className={styles.feed_item_price}>
                    <p className="text text_type_digits-default">
                        400
                    </p>
                    <CurrencyIcon type={"primary"}/>
                </div>

            </div>

        </div>
    )
}