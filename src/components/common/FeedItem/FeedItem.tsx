import styles from "./FeedItem.module.scss"

import {useNavigate} from "react-router-dom";

import {TOrder} from "declarations/types";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";
import {useSelector} from "hooks/reduxHooks.ts";
import {RootState} from "declarations/rootState.ts";
import {IIngredient} from "declarations/interfaces";

export default function FeedItem({order}: { order: TOrder | undefined }) {

    const navigate = useNavigate();

    const ingredientsArray = useSelector((state: RootState) => state.ingredients.ingredients);

    if (order && order.ingredients) {

        const ingredients = order.ingredients;

        const orderIngredients = ingredientsArray.filter(elem => ingredients.includes(elem._id));

        const orderCount = (orderIngredients.length > 5) ? (orderIngredients.length - 5) : 1;

        const orderBun = orderIngredients.find(elem => elem.type === 'bun');

        const calculateTotalAmount = (orderIngredients: IIngredient[], buns: IIngredient | null): number => {
            const ingredientsTotal = orderIngredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0) || 0;
            const bunTotal = buns?.price || 0;
            return ingredientsTotal + bunTotal;
        };

        const orderPrice = calculateTotalAmount(orderIngredients, orderBun);

        return (
            <div
                className={styles.feed_item}
                onClick={() => navigate('/feed/:number')}
            >
                {order &&
                    <>
                        <div className={styles.feed_item_info}>
                            <p>{order.number}</p>
                            <p className={styles.order_date}>{order.createdAt}</p>
                        </div>

                        <div className={`${styles.feed_item_name} pt-6`}>
                            <h4>{order.name}</h4>
                        </div>

                        <div className={`${styles.feed_item_ingredients} pt-6 pb-6`}>

                            <div className={styles.ingredients_thumbnail}>

                                {
                                    orderIngredients.slice(0, 5).map(
                                        (elem, i: number) =>
                                            <div
                                                key={i}
                                                style={{zIndex: 100 - i}}
                                            >
                                                <Thumbnail
                                                    image={elem.image}
                                                    count={orderCount}
                                                    isLast={i === 4}
                                                />
                                            </div>
                                    )
                                }
                            </div>

                            <div className={styles.feed_item_price}>
                                <p className="text text_type_digits-default">
                                    {orderPrice}
                                </p>
                                <CurrencyIcon type={"primary"}/>
                            </div>

                        </div>
                    </>
                }
            </div>
        )
    }
}