import styles from "./FeedItem.module.scss"

import {useSelector} from "hooks/reduxHooks.ts";

import {TOrder} from "declarations/types";
import {IIngredient} from "declarations/interfaces";

import Thumbnail from "common/Thumbnail/Thumbnail.tsx";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

export default function FeedItem({currentOrder}: { currentOrder: TOrder | undefined }) {

    const ingredientsData = useSelector(state => state.ingredients.ingredients);

    if (currentOrder && currentOrder.ingredients) {


        // --------------- CALCULATION DATA ---------------

        const ingredients = currentOrder.ingredients;
        // --------------- INGREDIENTS FULL DATA
        const orderIngredients = ingredientsData.filter(elem => ingredients.includes(elem._id as string));
        // --------------- COUNTER
        const orderCount = (orderIngredients.length > 5) ? (orderIngredients.length - 5) : 1;
        // --------------- BUN DATA
        const orderBun = orderIngredients.find(elem => elem.type === 'bun');
        // --------------- TOTAL AMOUNT
        const calculateTotalAmount = (orderIngredients: IIngredient[], buns: IIngredient | undefined): number => {
            const ingredientsTotal = orderIngredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0);
            const bunTotal = buns?.price || 0;
            return ingredientsTotal + bunTotal;
        };

        const orderPrice = calculateTotalAmount(orderIngredients, orderBun);
        // --------------- DATE
        const OrderDate = () => {
            const dateFromServer = currentOrder.createdAt;

            return dateFromServer && <FormattedDate date={new Date(dateFromServer)}/>
        }

        return (
            <div
                className={styles.feed_item}
            >
                {currentOrder &&
                    <>
                        <div className={styles.feed_item_info}>
                            <p>{currentOrder.number}</p>
                            <p className={styles.order_date}>
                                <OrderDate/>
                            </p>
                        </div>

                        <div className={`${styles.feed_item_name} pt-6`}>
                            <h4>{currentOrder.name}</h4>
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